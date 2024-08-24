export type MongooseError =
  | CastError
  | GeneralError
  | ValidationError;

export interface CastError {
  stringValue?: string;
  messageFormat?: string;
  kind: "Boolean" | "Number" | "String";
  value?: string;
  path: string;
  valueType?: string;
}

export interface GeneralError {
  errorResponse: GeneralErrorResponse;
}

export interface GeneralErrorResponse {
  index: number;
  code: number;
  errmsg: string;
  keyPattern: { [key: string]: number };
  keyValue: Record<string, number | string>;
}

export interface ValidationError {
  errors: {
    [key: string]: CastError | ValidatorError;
  };
}

export interface ValidatorError {
  kind: string;
  path: string;
}
