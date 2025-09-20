// types
import { type ObjectId } from "mongoose";
import { type Document } from "../../_document";
import { type UserDocument } from "../collections/user";

export interface ContributionDocument extends Document {
  contributor: UserDocument | ObjectId | string;
  amount: number;
}
