import mongoose from "mongoose"
export const ServiceSchema = new mongoose.Schema({
  type: Number,
  date: String,
  subject: String,
  body: String,
  completeddate: String,
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machine" }],
  areas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Area" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

const Service = mongoose.model("service", ServiceSchema)
export default Service
