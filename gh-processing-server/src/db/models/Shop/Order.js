import mongoose from "mongoose"
require("./User")
require("./Part")
export const OrderSchema = new mongoose.Schema({
  quantity: Number,
  date: String,
  arrived: Boolean,
  arriveddate: String,
  receivedquantity: Number,
  backorder: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  part: { type: mongoose.Schema.Types.ObjectId, ref: "part" },
})
const Order = mongoose.model("order", OrderSchema)
export default Order
