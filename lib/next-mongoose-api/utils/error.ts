// libraries
import mongoose from "mongoose";

// constants
import { serverErrorResponse } from "../constants/errorResponse";

// types
import {
  type CastError,
  type GeneralError,
  type MongooseError,
  type ValidationError,
  type ValidatorError
} from "../types/error";
import {
  type Response,
  type ResponseMessage
} from "../types/response";

// utils
const getTypeLabel = (
  type: "Boolean" | "Number" | "String"
) => {
  switch (type) {
    case "Boolean":
      return "'true' or 'false'";

    case "Number":
      return "'number'";

    default:
      return "'text'";
  }
};

export const generateCastErrorResponse = (
  key: string,
  requiredType: "Boolean" | "Number" | "String"
): Response<null> => ({
  status: 400,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: `'${key}' should be ${getTypeLabel(requiredType)}`
      }
    ]
  }
});

export const generateDuplicateKeyErrorResponse = (
  key: string,
  value: number | string
): Response<null> => ({
  status: 409,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: `${key} '${value}' already exists`
      }
    ]
  }
});

export const generateValidationErrorResponse =
  (errors: {
    [key: string]: CastError | ValidatorError;
  }): Response<null> => {
    const messages: ResponseMessage[] = [];

    for (let key in errors) {
      if (
        errors[key] instanceof
        mongoose.Error.CastError
      ) {
        const castError = errors[
          key
        ] as CastError;

        messages.push({
          type: "error",
          message: `'${key}' should be ${getTypeLabel(castError.kind)}`
        });
      } else if (
        errors[key] instanceof
        mongoose.Error.ValidatorError
      ) {
        messages.push({
          type: "error",
          message: `'${key}' is required`
        });
      }
    }

    return {
      status: 400,
      data: {
        data: null,
        messages
      }
    };
  };

// handlers
export const handleError = (
  error: MongooseError
): Response<null> => {
  if (error instanceof mongoose.Error.CastError) {
    const castError = error as CastError;

    const {
      stringValue,
      messageFormat,
      kind,
      value,
      path,
      valueType
    } = {
      stringValue: castError?.stringValue,
      messageFormat: castError?.messageFormat,
      kind: castError?.kind,
      value: castError?.value,
      path: castError?.path,
      valueType: castError?.valueType
    };

    return generateCastErrorResponse(path, kind);
  } else if (
    error instanceof
    mongoose.Error.ValidationError
  ) {
    const validationError =
      error as ValidationError;

    const errors = validationError?.errors;

    return generateValidationErrorResponse(
      errors
    );
  } else {
    const generalError = error as GeneralError;

    const {
      index,
      code,
      errmsg,
      keyPattern,
      keyValue
    } = {
      index: generalError?.errorResponse?.index,
      code: generalError?.errorResponse?.code,
      errmsg: generalError?.errorResponse?.errmsg,
      keyPattern:
        generalError?.errorResponse?.keyPattern,
      keyValue:
        generalError?.errorResponse?.keyValue
    };

    switch (code) {
      case 11000: {
        const key = Object.keys(keyValue)[0];

        return generateDuplicateKeyErrorResponse(
          key,
          keyValue[key]
        );
      }

      default:
        return serverErrorResponse;
    }
  }
};
