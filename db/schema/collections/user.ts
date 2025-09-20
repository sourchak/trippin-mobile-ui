// libraries
import { Schema } from "mongoose";

// types
import {
  type UserDocument,
  type UserModel
} from "@/types/documents/collections/user";

export const userSchema = new Schema<
  UserDocument,
  UserModel
>(
  {
    mobileNo: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
