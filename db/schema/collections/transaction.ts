// libraries
import { Schema, Types } from "mongoose";

// schema
import { contributionSchema } from "@/db/schema/nested/contribution";
import { recipientSchema } from "@/db/schema/nested/recipient";

// types
import {
  TransactionDocument,
  TransactionModel
} from "@/types/documents/collections/transaction";

export const transactionSchema = new Schema<
  TransactionDocument,
  TransactionModel
>(
  {
    trip: {
      type: Types.ObjectId,
      ref: "Trip",
      required: true
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      enum: [
        "personal",
        "food",
        "rent",
        "travel",
        "others"
      ],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    contributions: [
      {
        type: contributionSchema,
        required: true
      }
    ],
    recipients: [
      {
        type: recipientSchema,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);
