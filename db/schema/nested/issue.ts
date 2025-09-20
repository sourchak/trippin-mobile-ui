// libraries
import { Schema } from "mongoose";

// types
import { type IssueDocument } from "@/types/documents/nested/issue";

export const issueSchema =
  new Schema<IssueDocument>(
    {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      isResolved: {
        type: Boolean,
        required: true,
        default: false
      },
      isClosed: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true
    }
  );
