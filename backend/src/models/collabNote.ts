import mongoose, { Schema, Types } from "mongoose";

const collabNoteSchema = new Schema(
  {
    users: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: {
        validator: function (value: Types.ObjectId[]) {
          // 🔒 prevent duplicate users
          return new Set(value.map(String)).size === value.length;
        },
        message: "Duplicate users are not allowed in a collab",
      },
    },

    title: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("CollabNote", collabNoteSchema);
