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
      next: (data) => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
      error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    })
  }
}
export const getBrand = async (record) => {
  if (sanitizeName(record.BRAND) != undefined) {
    const brandquery = {
      query: gql`
        query brand($name: String!) {
          brand(name: $name) {
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
        name: sanitizeName(record.BRAND),
      },
    }
    return execute(link, brandquery)
  }
  return undefined
}

export const createBrandFromMachine = async (record, id) => {
  return new Promise(async (resolve, reject) => {
    if (sanitizeName(record.BRAND) != undefined) {
      let brandQueryResults = await getBrand(record)
      brandQueryResults.subscribe({
        next: (data) => {
          if (data.data.brand != null) {
            console.log(`${sanitizeName(record.BRAND)} already on db`)
            console.log(data.data.brand)
            if (data.data.brand.machines == undefined || data.data.brand.machines[0] == null) {
              console.log("update from undefined")
              const newMachines = [id]
              resolve(updateBrandMachines(newMachines, data.data.brand.id))
            } else {
              if (id in data.data.brand.machines) {
                console.log("already on record")
                resolve(getBrand(record))
              } else {
                let newMachines = [id]
                console.log(data.data.brand)
                Promise.all(
                  data.data.brand.machines.map((machine) => {
                    newMachines = [...newMachines, machine.id]
                  })
                ).then(() => {
                  resolve(updateBrandMachines(newMachines, data.data.brand.id))
                })
              }
            }
          } else {
            console.log(`${sanitizeName(record.AREA)} not on db`)
            const gqlmutation = {
              query: gql`
                mutation createBrand($input: BrandInput) {
                  CreateBrand(brand: $input) {
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
                  name: sanitizeName(record.BRAND),
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
export const updateBrandMachines = async (machines, brandId) => {
  console.log(`updating ${machines.length} machine records`)
  const gqlmutation = {
    query: gql`
      mutation updateBrand($input: BrandInput) {
        UpdateBrand(machines: $input) {
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
        id: brandId,
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
