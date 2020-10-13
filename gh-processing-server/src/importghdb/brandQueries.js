import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

export const createBrand = (record) => {
  if (record.CAT != undefined) {
    const gqlmutation = {
      query: gql`
        mutation createCategory($input: CategoryInput) {
          CreateCategory(category: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: sanitizeName(record.CAT),
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
export const getBrand = (record) => {
  if (sanitizeName(record.BRAND) != undefined) {
    const recordsFound = {}
    const brandquery = {
      query: gql`
        query brand($name: String!) {
          brand(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name: sanitizeName(record.BRAND),
      },
    }
    execute(link, brandquery).subscribe({
      next: (data) => {
        if (data.data.brand != null) {
          recordsFound = { ...recordsFound, record }
        }
      },
      error: (error) =>
        console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => {
        return recordsFound
      },
    })
  }
}
