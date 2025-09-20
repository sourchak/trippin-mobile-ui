// types
import { type Document, type Model } from "../../_document";

export interface UserDocument extends Document {
  mobileNo: number;
  name: string;
  password: string;
}

export interface UserModel extends Model<UserDocument> {}
