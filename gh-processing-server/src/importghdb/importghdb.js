import { DBFFile } from "dbffile"
import { execute, makePromise } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import gql from "graphql-tag"
import fetch from "node-fetch"
import { sanitizeName } from "./sanitizeName"
import { getArea, createArea } from "./areaQueries"
import { getBrand, createBrand } from "./brandQueries"
import { createPart } from "./partQueries"
import { createCategory } from "./categoryQueries"

// Aight, I should first insert all the information that I have about x stuff, then create the data that doesnt exist on the database.
// THEN create the relationships

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })


// Areas come from dat_area.dbf
async function importAreas() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//dat_area.dbf"
  )
  console.log(`Areas DBF file contains ${dbf.recordCount} records.`)
  let records = await dbf.readRecords()
  for (let record of records) createArea(record)
}

// Categories come from dat_cat.dbf
async function importCategories() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//dat_cat.dbf"
  )
  console.log(`Categories DBF file contains ${dbf.recordCount} records.`)
  let records = await dbf.readRecords()
  for (let record of records) {
    createCategory(record)
  }
}

/* Brand comes from importMachines() and importParts() 
   Contacts comes from importMachines() and importParts() 
   Media comes from importMachines() and importParts() 
   Suppliers comes from importMachines() and importParts() */

// Machines come from machinery.dbf
async function importMachines() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//machinery.dbf"
  )
  console.log(`Machinery DBF file contains ${dbf.recordCount} records.`)
  let records = await dbf.readRecords()
  
  // Iterate through all the records
  for (const record of records) {
    if (record.MACHINERY != null) {
      // Query for getting the Area ID, if no results are returned, a new record must be created.
      const areasFound = await getArea(record)
      if(areasFound){
        areasFound.subscribe({
          next: (data) =>
            {
              if(!data.data.area) {
              // Area not found on DB, should create the record.AREA record
              console.log(`${record.AREA} area not found on DB, should create record`)
              createArea(record)
            }else{
              console.log(`found ${record.AREA}`)
            }},
          error: (error) =>
            console.log(`received error ${JSON.stringify(error, null, 2)}`)
        })
      }
    }
    continue
    const gqlmutation = {
      query: gql`
        mutation createCategory($input: MachineInput) {
          CreateMachine(machine: $input) {
            id
            name
          }
        }
      `,
      variables: {
        input: {
          name: sanitizeName(record.MACHINERY),
          //Continue HERE
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

// Parts come from parts.dbf
async function importParts() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//parts.dbf"
  )
  console.log(`DBF file contains ${dbf.recordCount} records.`)
  let records = await dbf.readRecords()
  for (let record of records) createPart(record)
}

// Notes come from dat_notes.dbf

// Orders come from parts.dbf (only pen_ord should be added)

// Services comes dat_mpr.dbf

// Users will be created on interface

async function test() {
  importMachines()
}

test()
