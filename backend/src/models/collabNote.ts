import mongoose from "mongoose";

const collabSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    title: {
  type: String,
  default: "Untitled Collab Note"
},
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("CollabNote", collabSchema);
