import mongoose from "mongoose"
require("./Brand")
require("./Supplier")
export const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  brand: [{ type: mongoose.Schema.Types.ObjectId, ref: "brand" }],
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "supplier" }],
})

const Contact = mongoose.model("contact", ContactSchema)
export default Contact
