// libraries
import {
  Document as MongooseDocument,
  Model as MongooseModel
} from "mongoose";

// document
export interface Document
  extends MongooseDocument {
  createdAt: Date | string;
  updatedAt: Date | string;
}

// model
export interface Model<T>
  extends MongooseModel<T> {}
