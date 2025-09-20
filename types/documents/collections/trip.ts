// libraries
import { type ObjectId } from "mongoose";

// types
import { type Document, type Model } from "../../_document";
import { type UserDocument } from "./user";

export interface TripDocument extends Document {
  owner: UserDocument | ObjectId | string;
  title: string;
  description: string;
  members: UserDocument[] | ObjectId[] | string[];
}

export interface TripModel extends Model<TripDocument> {}
