import { DBFFile } from "dbffile"
import { createPart } from "./partQueries"
import { createMachine, createMachineFromPart } from "./machineQueries"
import { createArea, createAreaFromMachine, createAreaFromService } from "./areaQueries"
import { createBrandFromMachine, createBrandFromPart } from "./brandQueries"
import { createCategory, createCategoryFromPart } from "./categoryQueries"
import { createNote, createNoteFromPart } from "./noteQueries"
import { createMediaFromMachine, createMediaFromPart } from "./mediaQueries"
import { createOrder } from "./orderQueries"
import { createSupplierFromPart } from "./supplierQueries"
import { createContactFromPart } from "./contactQueries"
import * as dbFilenames from "./dbFileNames"

// Aight, I should first insert all the information that I have about x stuff, then create the data that doesnt exist on the database.
// THEN create the relationships
// Removed disclaimer, i kinda know what to do

async function readDBFFile(filename) {
  let dbf = await DBFFile.open(filename)
  return await dbf.readRecords()
}

// Areas come from dat_area.dbf
async function importAreas() {
  let records = await readDBFFile(dbFilenames.AREADBF)
  for (let record of records) createArea(record)
}

// Categories come from dat_cat.dbf
async function importCategories() {
  let records = await readDBFFile(dbFilenames.CATEGORIESDBF)
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
    let createMachineQuery = await createMachine(record)
    createMachineQuery.subscribe({
      next: (data) => {
        createAreaFromMachine(record, data.data.machine.id)
        //createBrandFromMachine(record, data.data.machine.id)
        //createMediaFromMachine(record, data.id)
      },
      error: (error) => console.log(`received error ${JSON.stringify(error, null, 2)}`),
      complete: () => console.log(`complete`),
    })
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
    createMachineFromPart(record, partID)
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
  console.log("Downloading old database into machine...")
  importAreas()
  importCategories()
  importMachines()
  // importParts()
  // importNotes()
  // importServices()
}

test()
