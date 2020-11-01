import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

export const createPart = (record) => {
  if (sanitizeName(record.PART_NO) != undefined) {
    const gqlmutation = {
      query: gql`
        mutation CreatePart($input: PartInput) {
          CreatePart(part: $input) {
            id
            partnumber
            serialnumber
          }
        }
      `,
      variables: {
        input: {
          partnumber: sanitizeName(record.PART_NO, true),
          description: sanitizeName(record.PART_DESC),
          availablestock: record.UN_STOCK,
          location: sanitizeName(record.STOCK_NO),
          reorderlevel: record.REOR_LVL,
          discontinued: Boolean(record.DISCONTD),
          serialnumber: sanitizeName(record.S_N, true),
          model: record.MODEL,
          price: record.UNIT_PRI,
          code: "Unregistered",
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
