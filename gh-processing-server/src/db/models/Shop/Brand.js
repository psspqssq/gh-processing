import mongoose from "mongoose"
require("./Contact")
require("./Machine")
require("./Part")
export const BrandSchema = new mongoose.Schema({
  name: String,
  webpage: String,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "contact" }],
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "machine" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
})

const Brand = mongoose.model("brand", BrandSchema)
export default Brand
