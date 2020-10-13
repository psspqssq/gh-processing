import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

export const createArea = (record) => {
  if (record.AREA != undefined) {
    const gqlmutation = {
      query: gql`
        mutation createArea($input: AreaInput) {
          CreateArea(area: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: sanitizeName(record.AREA),
          location: "Unset",
        },
      },
    }
    execute(link, gqlmutation).subscribe({
      next: (data) =>
        console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: (error) =>
        console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    })
  }
}


// Since this is an async function I can't give a result until it is resolved, so I'll return the observable and subscribe on it.
export const getArea = async (record) => {
  let recordsFound = {}
  if (sanitizeName(record.AREA) != undefined) {
    const areaquery = {
      query: gql`
        query area($name: String!) {
          area(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name: sanitizeName(record.AREA),
      },
    }
    return execute(link, areaquery)
  }
  return undefined
}
