// types
import { type Document } from "../../_document";

export interface IssueDocument extends Document {
  title: string;
  message: string;
  isResolved: boolean;
  isClosed: boolean;
}
