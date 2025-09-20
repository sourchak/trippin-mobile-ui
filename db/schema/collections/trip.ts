// libraries
import { Schema } from "mongoose";

// types
import {
  type TripDocument,
  type TripModel
} from "@/types/documents/collections/trip";

export const tripSchema = new Schema<
  TripDocument,
  TripModel
>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);
