import mongoose from "mongoose"
require("./User")
export const NoteSchema = new mongoose.Schema({
  requestdate: String,
  completeddate: String,
  open: Boolean,
  subject: String,
  note: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
})

const Note = mongoose.model("note", NoteSchema)
export default Note
