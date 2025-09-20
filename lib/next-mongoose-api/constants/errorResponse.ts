import { Response } from "../types/response";

export const badRequestErrorResponse: Response<null> =
  {
    status: 404,
    data: {
      data: null,
      messages: [
        {
          type: "error",
          message: "Bad Request"
        }
      ]
    }
  };

export const notFoundErrorResponse: Response<null> =
  {
    status: 404,
    data: {
      data: null,
      messages: [
        {
          type: "error",
          message: "Not Found"
        }
      ]
    }
  };

export const serverErrorResponse: Response<null> =
  {
    status: 500,
    data: {
      data: null,
      messages: [
        {
          type: "error",
          message: "Server Error"
        }
      ]
    }
  };

export const unauthenticatedErrorResponse: Response<null> =
  {
    status: 401,
    data: {
      data: null,
      messages: []
    }
  };
