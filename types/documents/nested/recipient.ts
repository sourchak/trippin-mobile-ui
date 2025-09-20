// libraries
import { ObjectId } from "mongoose";

// types
import { type IssueDocument } from "./issue";
import { type UserDocument } from "../collections/user";

export interface RecipientDocument extends Document {
  recipient: UserDocument | ObjectId | string;
  amount: number;
  issue: IssueDocument;
}
