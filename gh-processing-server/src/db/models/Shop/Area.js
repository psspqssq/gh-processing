import mongoose from "mongoose"

export const AreaSchema = new mongoose.Schema({
  name: String,
  location: String,
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machine" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
})

const Area = mongoose.model("area", AreaSchema)
export default Area
