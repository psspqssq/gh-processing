import { DBFFile } from "dbffile"
import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

async function importParts() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//parts.dbf"
  )
  console.log(`DBF file contains ${dbf.recordCount} records.`)
  console.log(`Field names: ${dbf.fields.map((f) => f.name).join(", ")}`)
  let records = await dbf.readRecords()
  for (let record of records) console.log(record)
} // Still needs to be finished

function sanitizeName(name) {
  let sanitizedName = ""
  let namewords = name.split(" ")
  if (namewords.length == 0) return undefined
  namewords.forEach((word) => {
    if (word == " ") return
    if (word == "") return
    sanitizedName = sanitizedName + word[0].toUpperCase()
    sanitizedName = sanitizedName + word.substring(1).toLowerCase()
    sanitizedName = sanitizedName + " "
  })
  sanitizedName = sanitizedName.substring(0, sanitizedName.length - 1)
  if (sanitizedName.length == 0) return undefined
  return sanitizedName
}

async function importAreas() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//dat_area.dbf"
  )
  console.log(`Areas DBF file contains ${dbf.recordCount} records.`)
  let records = await dbf.readRecords()
  for (let record of records) {
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
}

// Brand should be imported from machines/parts

async function importCategories() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//dat_cat.dbf"
  )
  console.log(`Categories DBF file contains ${dbf.recordCount} records.`)
  let records = await dbf.readRecords()
  for (let record of records) {
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
}
