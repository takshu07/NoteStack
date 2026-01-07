import { Schema, model, Document, Types } from "mongoose";

/**
 * Note document interface
 */
export interface INote extends Document { // extend document gives us all mongoose methods like save, update etc
  title: string;
  content: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true 
    },

    content: {
      type: String,
      required: true
    },
    // owner added for authorization
        owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Important for user-based queries
    },

  },
  {
    timestamps: true
  }
);

/**
 * Compound index ensures fast retrieval of notes per user
 * Useful when listing notes in dashboards
 */
noteSchema.index({ owner: 1, createdAt: -1 });

export const Note = model<INote>("Note", noteSchema);
