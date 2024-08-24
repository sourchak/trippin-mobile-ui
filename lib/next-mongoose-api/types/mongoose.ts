// types
import { type ClientSession } from "mongoose";

export type Middleware<T> = (
  document: T
) => T | Promise<T>;

export interface PopulateType {
  path: string;
  select?: string[];
  populate?: PopulateType[];
  strictPopulate?: boolean;
}

export type SessionMiddleware<T> = (
  document: T,
  session: ClientSession
) => T | Promise<T>;
