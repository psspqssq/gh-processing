import mongoose from "mongoose"

export const MachineSchema = new mongoose.Schema({
  name: String,
  model: String,
  serialnumber: String,
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  areas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Area" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
})

const Machine = mongoose.model("machine", MachineSchema)
export default Machine
