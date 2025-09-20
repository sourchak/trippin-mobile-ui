// libraries
import { Schema, Types } from "mongoose";

// schemas
import { issueSchema } from "@/db/schema/nested/issue";

// types
import { RecipientDocument } from "@/types/documents/nested/recipient";

export const recipientSchema =
  new Schema<RecipientDocument>(
    {
      recipient: {
        type: Types.ObjectId,
        ref: "User",
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      issue: {
        type: issueSchema,
        required: false
      }
    },
    {
      timestamps: true
    }
  );
