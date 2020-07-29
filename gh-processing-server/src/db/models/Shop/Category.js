import mongoose from "mongoose"
require("./Part")
export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
})

const Category = mongoose.model("category", CategorySchema)
export default Category
