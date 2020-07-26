import mongoose from "mongoose"
require("./Service")
require("./Note")
require("./Order")
export const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  type: Number,
  email: String,
  phone: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "service" }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "note" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
})

const User = mongoose.model("user", UserSchema)
export default User
