// UNFINISHED, MUST KEEP ADDING PROPERTIES

import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

export const createMachine = async (record) => {
  return new Promise(async (resolve, reject) => {
    if (sanitizeName(record.MACHINERY) != undefined) {
      let machineQueryResults = await getMachine(record)
      machineQueryResults.subscribe({
        next: (data) => {
          if (data.data.machine != null) {
            console.log(`${sanitizeName(record.MACHINERY)} already on db`)

            resolve(getMachine(record))
          } else {
            console.log(`${sanitizeName(record.MACHINERY)} not on db`)
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
            resolve(execute(link, gqlmutation))
          }
        },
        error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
        complete: () => {},
      })
    }
  })
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
        name: sanitizeName(record.MACHINERY),
      },
    }
    return execute(link, machinequery)
  }
  return undefined
}
