import mongoose from "mongoose"

export const MediaSchema = new mongoose.Schema({
  address: String,
  type: Number,
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Machine" }],
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
})

const Media = mongoose.model("media", MediaSchema)
