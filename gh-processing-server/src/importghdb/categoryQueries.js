import { execute, makePromise } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import fetch from "node-fetch";
import { sanitizeName } from "./sanitizeName";

const uri = "http://localhost:3333/graphql";
const link = createHttpLink({ uri, fetch });

export const createCategory = (record) => {
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
    };
    execute(link, gqlmutation).subscribe({
      next: (data) => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    });
  }
};
