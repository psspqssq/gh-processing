import mongoose from "mongoose"

export const MachineSchema = new mongoose.Schema({
  name: String,
  model: String,
  serialnumber: String,
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand" },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "note" }],
  areas: [{ type: mongoose.Schema.Types.ObjectId, ref: "area" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "supplier" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
})

const Machine = mongoose.model("machine", MachineSchema)
export default Machine
