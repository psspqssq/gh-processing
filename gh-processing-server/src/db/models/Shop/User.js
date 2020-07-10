import mongoose from "mongoose"
export const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  type: Number,
  email: String,
  phone: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
})

const User = mongoose.model("ser", UserSchema)
export default User
