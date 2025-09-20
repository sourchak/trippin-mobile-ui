// libraries
import { Schema, Types } from "mongoose";

// types
import { ContributionDocument } from "@/types/documents/nested/contribution";

export const contributionSchema =
  new Schema<ContributionDocument>(
    {
      contributor: {
        type: Types.ObjectId,
        ref: "User",
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    },
    {
      timestamps: true
    }
  );
