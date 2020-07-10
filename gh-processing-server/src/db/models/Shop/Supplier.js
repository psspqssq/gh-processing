import mongoose from "mongoose"
export const SupplierSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machine" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
})

const Supplier = mongoose.model("supplier", SupplierSchema)
export default Supplier
