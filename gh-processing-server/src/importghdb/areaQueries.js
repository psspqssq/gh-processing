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
      next: (data) => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    })
  }
}

// Since this is an async function I can't give a result until it is resolved, so I'll return the observable and subscribe on it.
export const getArea = async (record) => {
  if (sanitizeName(record.AREA) != undefined) {
    const areaquery = {
      query: gql`
        query area($name: String!) {
          area(name: $name) {
            id
            name
            machines {
              id
              name
            }
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

export const createAreaFromMachine = async (record, id) => {
  return new Promise(async (resolve, reject) => {
    if (sanitizeName(record.AREA) != undefined) {
      let areaQueryResults = await getArea(record)
      areaQueryResults.subscribe({
        next: (data) => {
          if (data.data.area != null) {
            console.log(`${sanitizeName(record.AREA)} already on db`)
            console.log(data.data.area)
            if (data.data.area.machines == undefined || data.data.area.machines[0] == null) {
              console.log("update from undefined")
              const newMachines = [id]
              resolve(updateAreaMachines(newMachines, data.data.area.id))
            } else {
              let inlist = false
              Promise.all(
                data.data.area.machines.map((machine) => {
                  if (machine.id == id) inlist = true
                })
              ).then(() => {
                if (inlist) {
                  console.log("already on record")
                  resolve(getArea(record))
                } else {
                  let newMachines = [id]
                  console.log(data.data.area)
                  Promise.all(
                    data.data.area.machines.map((machine) => {
                      newMachines = [...newMachines, machine.id]
                    })
                  ).then(() => {
                    resolve(updateAreaMachines(newMachines, data.data.area.id))
                  })
                }
              })
            }
          } else {
            console.log(`${sanitizeName(record.AREA)} not on db`)
            const gqlmutation = {
              query: gql`
                mutation createArea($input: AreaInput) {
                  CreateArea(area: $input) {
                    id
                    name
                    machines {
                      name
                      details
                    }
                  }
                }
              `,
              variables: {
                input: {
                  name: sanitizeName(record.AREA),
                  location: "Unset",
                  machines: [id],
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

export const updateAreaMachines = async (machines, areaId) => {
  console.log(`updating ${machines.length} machine records`)
  const gqlmutation = {
    query: gql`
      mutation updateArea($input: AreaInput) {
        UpdateArea(machines: $input) {
          id
          name
          machines {
            name
            details
          }
        }
      }
    `,
    variables: {
      input: {
        id: areaId,
        machines: machines,
      },
    },
  }
  execute(link, gqlmutation).subscribe({
    next: (data) => {}, //console.log(`received data: ${JSON.stringify(data, null, 2)}`),
    error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
    complete: () => console.log(`complete`),
  })
}
