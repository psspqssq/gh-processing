import mongoose from "mongoose"
require("./Machine")
require("./Service")

export const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "machine" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
})

const Area = mongoose.model("area", AreaSchema)
export default Area
