import mongoose from "mongoose"

export const PartSchema = new mongoose.Schema({
  partnumber: String,
  availablestock: Number,
  location: String,
  reorderlevel: Number,
  discontinued: Date,
  serialnumber: String,
  model: String,
  notes: String,
  price: Number,
  code: String,
  brand: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machine" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }],
  medias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
})

const Part = mongoose.model("part", PartSchema)
export default Part
