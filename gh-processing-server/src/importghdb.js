import { DBFFile } from "dbffile"

async function testRead() {
  let dbf = await DBFFile.open(
    "C://Users//MSI//Documents//GH Processing//data//parts.dbf"
  )
  console.log(`DBF file contains ${dbf.recordCount} records.`)
  console.log(`Field names: ${dbf.fields.map((f) => f.name).join(", ")}`)
  let records = await dbf.readRecords(100)
  for (let record of records) console.log(record)
}

testRead()
