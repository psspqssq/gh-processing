import mongoose from "mongoose"
export const CategorySchema = new mongoose.Schema({
  name: String,
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
})

const Category = mongoose.model("category", CategorySchema)
export default Category
