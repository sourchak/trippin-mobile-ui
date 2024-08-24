// types
import { type NextResponse } from "next/server";

export type ResponseMessage = {
  id?: string;
  type: "success" | "warning" | "error";
  message: string;
};

export interface ResponseData<T> {
  count?: number;
  data: null | Partial<T>;
  messages: ResponseMessage[];
}

export type Response<T> = {
  status: number;
  data: ResponseData<T>;
};

export type APIResponse<T> = NextResponse<
  ResponseData<T>
>;
