import mongoose from "mongoose"

export const BrandSchema = new mongoose.Schema({
  name: String,
  webpage: String,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machine" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
})

const Brand = mongoose.model("brand", BrandSchema)
export default Brand
