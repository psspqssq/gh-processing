import mongoose from "mongoose"
export const OrderSchema = new mongoose.Schema({
  quantity: Number,
  date: String,
  arrived: Boolean,
  arriveddate: String,
  receivedquantity: Number,
  backorder: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
})
const Order = mongoose.model("order", OrderSchema)
export default Order
