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
import { createMachine } from "./machineQueries"
import { createNote } from "./noteQueries"
import * as dbFilenames from "./dbFileNames"

// Aight, I should first insert all the information that I have about x stuff, then create the data that doesnt exist on the database.
// THEN create the relationships
// Disclaimer: I can't wrap my head around how asynchronous stuff should work, so I'll add stuff to DB and let mongo filter out duplicates.

const uri = "http://localhost:3333/graphql"
const link = createHttpLink({ uri, fetch })

async function readDBFFile(filename) {
  let dbf = await DBFFile.open(filename)
  return await dbf.readRecords()
}

// Areas come from dat_area.dbf
async function importAreas() {
  let records = readDBFFile(dbFilenames.AREADBF)
  for (let record of records) createArea(record)
}

// Categories come from dat_cat.dbf
async function importCategories() {
  let records = readDBFFile(dbFilenames.CATEGORIESDBF)
  for (let record of records) createCategory(record)
}

// Machines come from machinery.dbf
// Areas comes from machinery.dbf
// Brands comes from machinery.dbf
// Contacts comes from machinery.dbf
// Media comes from machinery.dbf
// Suppliers comes from machinery.dbf

async function importMachines() {
  let records = await readDBFFile(dbFilenames.MACHINERYDBF)
  for (let record of records) {
    console.log(record)
    continue
    createMachine(record)
    createAreaFromMachine(record, machineID)
    createBrandFromMachine(record, machineID)
    createMediaFromMachine(record, machineID)
  }
}

// Parts come from parts.dbf
// Orders come from parts.dbf
// Categories comes from parts.dbf
// Machinery comes from parts.dbf
// Notes comes from parts.dbf
// Supplier comes from parts.dbf
// Contact comes from parts.dbf
// Brand comes from parts.dbf
// Media comes from parts.dbf
async function importParts() {
  let records = await readDBFFile(dbFilenames.PARTSDBF)
  for (let record of records) {
    console.log(record)
    continue
    createPart(record)
    createOrder(record)
    createCategoryFromPart(record, partID)
    createMachineryFromPart(record, partID)
    createNoteFromPart(record, partID)
    createSupplierFromPart(record, partID)
    createContactFromPart(record, partID)
    createBrandFromPart(record, partID)
    createMediaFromPart(record, partID)
  }
}

// Notes come from dat_notes.dbf
async function importNotes() {
  let records = await readDBFFile(dbFilenames.NOTESDBF)
  for (let record of records) createNote(record)
}

// Services comes dat_mpr.dbf
async function importServices() {
  let records = await readDBFFile(dbFilenames.SERVICESDBF)
  for (let record of records) {
    createService(record)
    createAreaFromService(record)
  }
}

// Users will be created on frontend

async function test() {
  importParts()
}

test()
