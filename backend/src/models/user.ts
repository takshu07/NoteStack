import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

/**
 * User document interface
 * Extending Document ensures full Mongoose typing support
 */
export interface IUser extends Document {
    userUUID: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    //userUUID field for public identification instead of MongoDB's _id => SECURITY PURPOSE
    userUUID: {
  type: String,
  default: () => uuidv4(),
  unique: true,
},
    name: {
      type: String,
      required: true,
      trim: true  // removes extra spaces
    },

    email: {
      type: String,
      required: true,
      unique: true, // Important: prevents duplicate accounts
      lowercase: true,
      index: true // speeds up User.findOne({ email })

    },

    password: {
      type: String,
      required: true,
      select: false // Important: password never returned in queries by default
      //User.findone({email}) -> password wont be returned    [Security purpose -> prevents password leak]
    }
  },
  {
    timestamps: true // Automatically adds createdAt & updatedAt
  }
);

export const User = model<IUser>("User", userSchema);
