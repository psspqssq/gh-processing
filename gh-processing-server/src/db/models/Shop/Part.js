import mongoose from "mongoose"
require("./Brand")
require("./Machine")
require("./Service")
require("./Category")
require("./Order")
require("./Supplier")
require("./Media")
require("./Note")
export const PartSchema = new mongoose.Schema({
  partnumber: String,
  availablestock: Number,
  location: String,
  reorderlevel: Number,
  discontinued: String,
  serialnumber: String,
  model: String,
  price: Number,
  code: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "note" }],
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand" },
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "machine" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "supplier" }],
  medias: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
})

const Part = mongoose.model("part", PartSchema)
export default Part
