import mongoose from "mongoose"
require("./Part")
export const CategorySchema = new mongoose.Schema({
  name: String,
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
})

const Category = mongoose.model("category", CategorySchema)
export default Category
