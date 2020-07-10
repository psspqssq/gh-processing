import mongoose from "mongoose"
export const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
})

const Contact = mongoose.model("contact", ContactSchema)
export default Contact
