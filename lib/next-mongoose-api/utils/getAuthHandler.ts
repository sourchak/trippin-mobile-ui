// libraries
import { NextRequest } from "next/server";

// utils
import authCookie from "./authCookie";
import { extractSearchParams } from "./searchParam";
import getAuthController from "./getAuthController";
import { getRequestBody } from "./request";
import { Response } from "./next";

// constants
import {
  serverErrorResponse,
  unauthenticatedErrorResponse
} from "../constants/errorResponse";

// types
import {
  type Response as ResponseType,
  type APIResponse,
  AuthTokenData
} from "../types/auth";
import {
  type Middleware,
  type SessionMiddleware
} from "../types/mongoose";
import {
  type Document,
  type Model,
  type Mongoose
} from "mongoose";
import { successData } from "./data";

type RegisterHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type LoginHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type ValidateHandlerProps<T> = {
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

const getAuthHandler = <
  DocumentT extends Document,
  ModelT extends Model<DocumentT>
>({
  connection,
  Model,
  jwtSecret,
  cookieName
}: {
  connection: () => Promise<Mongoose>;
  Model: ModelT;
  jwtSecret: string;
  cookieName: string;
}) => {
  const { register, login, validate } =
    getAuthController<DocumentT, ModelT>({
      connection,
      Model
    });

  return {
    register:
      (args?: RegisterHandlerProps<DocumentT>) =>
      async (
        req: NextRequest
      ): Promise<
        APIResponse<DocumentT | null>
      > => {
        try {
          const credentials =
            await getRequestBody<
              Partial<DocumentT>
            >(req);

          const response: ResponseType<DocumentT> =
            await register({
              credentials,
              requestDataMiddleware:
                args?.requestDataMiddleware,
              sessionMiddleware:
                args?.sessionMiddleware,
              responseDataMiddleware:
                args?.responseDataMiddleware,
              attempt: args?.attempt
            });

          if (response.data.data) {
            authCookie.set({
              name: cookieName,
              jwtSecret,
              payload: {
                id: response.data.data
                  ._id as string
              } as AuthTokenData,
              expiresIn: 86400
            });
          }

          return Response<DocumentT>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    login:
      (args?: LoginHandlerProps<DocumentT>) =>
      async (
        req: NextRequest
      ): Promise<
        APIResponse<DocumentT | null>
      > => {
        try {
          const searchParams =
            extractSearchParams(req);

          const credentials =
            await getRequestBody<
              Partial<DocumentT>
            >(req);

          const response: ResponseType<DocumentT> =
            await login({
              searchParams,
              credentials,
              sessionMiddleware:
                args?.sessionMiddleware,
              responseDataMiddleware:
                args?.responseDataMiddleware,
              attempt: args?.attempt
            });

          if (response.data.data) {
            authCookie.set({
              name: cookieName,
              jwtSecret,
              payload: {
                id: response.data.data
                  ._id as string
              },
              expiresIn: 86400
            });
          }

          return Response<DocumentT>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    validate:
      (args?: ValidateHandlerProps<DocumentT>) =>
      async (
        req: NextRequest
      ): Promise<
        APIResponse<DocumentT | null>
      > => {
        try {
          const searchParams =
            extractSearchParams(req);

          const tokenData = authCookie.get({
            name: cookieName,
            jwtSecret
          });

          if (!tokenData || !tokenData?.id) {
            authCookie.set({
              name: cookieName,
              jwtSecret,
              payload: { id: "" },
              expiresIn: -1
            });

            return Response<null>(
              unauthenticatedErrorResponse
            );
          }

          const response: ResponseType<DocumentT> =
            await validate({
              documentId: tokenData.id,
              searchParams,
              sessionMiddleware:
                args?.sessionMiddleware,
              responseDataMiddleware:
                args?.responseDataMiddleware,
              attempt: args?.attempt
            });

          return Response<DocumentT>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    logout:
      () =>
      async (
        req: NextRequest
      ): Promise<
        APIResponse<DocumentT | null>
      > => {
        try {
          authCookie.set({
            name: cookieName,
            jwtSecret,
            payload: { id: "" },
            expiresIn: -1
          });

          return Response<null>(
            successData<null>(null)
          );
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      }
  };
};

export default getAuthHandler;
