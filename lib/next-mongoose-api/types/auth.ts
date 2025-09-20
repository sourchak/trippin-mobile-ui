import { type NextResponse } from "next/server";

export type AuthTokenData = { id: string };

export type ToastType = {
  id?: string;
  type: "success" | "warning" | "error";
  message: string;
};

export interface ResponseData<T> {
  count?: number;
  data: null | Partial<T>;
  messages: ToastType[];
}

export type Response<T> = {
  status: number;
  data: ResponseData<T>;
};

export type APIResponse<T> = NextResponse<
  ResponseData<T>
>;
