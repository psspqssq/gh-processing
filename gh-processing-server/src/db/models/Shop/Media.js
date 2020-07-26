import mongoose from "mongoose"
require("./Machine")
require("./Part")
export const MediaSchema = new mongoose.Schema({
  address: String,
  type: Number,
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "machine" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "part" }],
})

const Media = mongoose.model("media", MediaSchema)
