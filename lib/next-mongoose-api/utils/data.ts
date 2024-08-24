// type
import {
  type Response,
  type ResponseMessage
} from "../types/response";

export const successData = <T>(
  data: T,
  count?: number,
  messages?: ResponseMessage[]
): Response<T> => ({
  status: 200,
  data: {
    ...(typeof count === "number"
      ? { count }
      : {}),
    data,
    messages:
      messages && messages?.length ? messages : []
  }
});
