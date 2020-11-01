// UNFINISHED, MUST KEEP ADDING PROPERTIES

import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

export const createMachine = (record) => {
  if (sanitizeName(record.MACHINERY) != undefined) {
    const gqlmutation = {
      query: gql`
        mutation createMachine($input: MachineInput) {
          CreateMachine(machine: $input) {
            id
            name
            model
            serialnumber
          }
        }
      `,
      variables: {
        input: {
          name: sanitizeName(record.MACHINERY),
          details: sanitizeName(record.DETAILS),
          model: sanitizeName(record.MODEL),
          serialnumber: sanitizeName(record.SN, true),
        },
      },
    }
    execute(link, gqlmutation).subscribe({
      next: (data) => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    })
  }
}

// Since this is an async function I can't give a result until it is resolved, so I'll return the observable and subscribe on it.
export const getMachine = async (record) => {
  if (sanitizeName(record.MACHINERY) != undefined) {
    const machinequery = {
      query: gql`
        query machine($name: String!) {
          machine(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name: sanitizeName(record.AREA),
      },
    }
    return execute(link, machinequery)
  }
  return undefined
}
