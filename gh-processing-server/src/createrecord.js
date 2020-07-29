import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

const AreaInput = {
  name: "Test Area",
  location: "t.t",
  machines: ["5f0bcbc12617455c386a812d"],
  services: ["5f122b2b4ffa4922f486e834"],
}

const operation = {
  query: gql`
    mutation {
      CreateArea(
        area: {
          name: "Test Area"
          machines: ["5f0bcbc12617455c386a812d"]
          services: ["5f122b2b4ffa4922f486e834"]
        }
      ) {
        id
        name
        machines {
          id
          name
        }
        services {
          id
          subject
        }
      }
    }
  `,
}

// execute returns an Observable so it can be subscribed to
execute(link, operation).subscribe({
  next: (data) =>
    console.log(`received data: ${JSON.stringify(data, null, 2)}`),
  error: (error) =>
    console.log(`received error ${JSON.stringify(error, null, 2)}`),
  complete: () => console.log(`complete`),
})

// For single execution operations, a Promise can be used
/*
makePromise(execute(link, operation))
  .then((data) => console.log(`received data ${JSON.stringify(data, null, 2)}`))
  .catch((error) => console.log(`received error ${error}`))*/
