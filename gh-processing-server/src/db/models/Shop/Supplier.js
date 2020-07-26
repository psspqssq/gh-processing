import mongoose from "mongoose"
require("./Contact")
require("./Machine")
require("./Part")
export const SupplierSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "contact" }],
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "macine" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
})

const Supplier = mongoose.model("supplier", SupplierSchema)
export default Supplier
