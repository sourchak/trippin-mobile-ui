// types
import { type ObjectId } from "mongoose";
import { type ContributionDocument } from "../nested/contribution";
import { type RecipientDocument } from "../nested/recipient";
import { type TripDocument } from "../collections/trip";
import { type UserDocument } from "../collections/user";
import { type Document, type Model } from "../../_document";

export interface TransactionDocument extends Document {
  trip: TripDocument | ObjectId | string;
  owner: UserDocument | ObjectId | string;
  category: "personal" | "food" | "rent" | "travel" | "others";
  title: string;
  contributions: ContributionDocument[];
  recipients: RecipientDocument[];
}

export interface TransactionModel extends Model<TransactionDocument> {}
