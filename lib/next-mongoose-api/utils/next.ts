// libraries
import { NextResponse } from "next/server";

// types
import {
  type APIResponse,
  type Response as ResponseType
} from "../types/response";

export const Response = <T>(
  response: ResponseType<T>
): APIResponse<T> =>
  NextResponse.json(response.data, {
    status: response.status
  });
