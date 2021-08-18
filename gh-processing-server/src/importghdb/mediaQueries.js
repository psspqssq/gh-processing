import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

export const createMedia = (record) => {
  if (record.DRAWING != undefined) {
    const gqlmutation = {
      query: gql`
        mutation createMedia($input: MediaInput) {
          CreateMedia(media: $input) {
            id
            address
            description
          }
        }
      `,
      variables: {
        input: {
          address: record.DRAWING,
          description: "Auto-generated on import",
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
export const getMedia = async (record) => {
  if (sanitizeName(record.DRAWING) != undefined) {
    const mediaquery = {
      query: gql`
        query media($address: String!) {
          media(address: $address) {
            id
            address
            description
            machines {
              id
              name
            }
          }
        }
      `,
      variables: {
        address: record.DRAWING,
        description: "Auto-generated on import",
      },
    }
    return execute(link, mediaquery)
  }
  return undefined
}

export const createMediaFromMachine = async (record, id) => {
  return new Promise(async (resolve, reject) => {
    if (record.DRAWING != undefined) {
      let mediaQueryResults = await getMedia(record)
      mediaQueryResults.subscribe({
        next: (data) => {
          if (data.data.media != null) {
            console.log(`${record.DRAWING} already on db`)
            console.log(data.data.media)
            if (data.data.media.machines == undefined || data.data.media.machines[0] == null) {
              console.log("update from undefined")
              const newMachines = [id]
              resolve(updateMediaMachines(newMachines, data.data.media.id))
            } else {
              let inlist = false
              Promise.all(
                data.data.media.machines.map((machine) => {
                  if (machine.id == id) inlist = true
                })
              ).then(() => {
                if (inlist) {
                  console.log("already on record")
                  resolve(getMedia(record))
                } else {
                  let newMachines = [id]
                  console.log(data.data.media)
                  Promise.all(
                    data.data.media.machines.map((machine) => {
                      newMachines = [...newMachines, machine.id]
                    })
                  ).then(() => {
                    resolve(updateMediaMachines(newMachines, data.data.media.id))
                  })
                }
              })
            }
          } else {
            console.log(`${sanitizeName(record.AREA)} not on db`)
            const gqlmutation = {
              query: gql`
                mutation createMedia($input: MediaInput) {
                  CreateMedia(media: $input) {
                    id
                    address
                    description
                    machines {
                      name
                      details
                    }
                  }
                }
              `,
              variables: {
                input: {
                  address: record.DRAWING,
                  machines: [id],
                  description: "Auto-generated on import",
                },
              },
            }
            execute(link, gqlmutation).subscribe({
              next: (data) => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
              error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
              complete: () => console.log(`complete`),
            })
          }
        },
        error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
        complete: () => {},
      })
    }
  })
}
export const updateMediaMachines = async (machines, mediaId) => {
  console.log(`updating ${machines.length} machine records`)
  const gqlmutation = {
    query: gql`
      mutation updateMedia($input: MediaInput) {
        UpdateMedia(machines: $input) {
          id
          address
          description
          machines {
            name
            details
          }
        }
      }
    `,
    variables: {
      input: {
        id: mediaId,
        machines: machines,
        description: "Auto-generated on import",
      },
    },
  }
  execute(link, gqlmutation).subscribe({
    next: (data) => {}, //console.log(`received data: ${JSON.stringify(data, null, 2)}`),
    error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
    complete: () => console.log(`complete`),
  })
}
