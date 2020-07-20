import mongoose from "mongoose"
require("./Machine")
require("./Area")
export const ServiceSchema = new mongoose.Schema({
  type: Number,
  date: String,
  subject: String,
  body: String,
  completeddate: String,
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "machine" }],
  areas: [{ type: mongoose.Schema.Types.ObjectId, ref: "area" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "note" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
})

const Service = mongoose.model("service", ServiceSchema)
export default Service
