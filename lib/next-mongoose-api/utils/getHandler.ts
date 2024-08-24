// libraries
import { NextRequest } from "next/server";

// utils
import { extractSearchParams } from "./searchParam";
import getController from "./getController";
import { getRequestBody } from "./request";
import { Response } from "./next";

// constants
import { serverErrorResponse } from "../constants/errorResponse";

// types
import {
  type Document,
  type Model,
  type Mongoose
} from "mongoose";
import { type APIResponse } from "../types/response";
import {
  type Middleware,
  type SessionMiddleware
} from "../types/mongoose";

type GetDocumentsHandler<T> = {
  sessionMiddleware?: SessionMiddleware<T[]>;
  responseDataMiddleware?: Middleware<T[]>;
  attempt?: number;
};

type GetDocumentHandler<T> = {
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type AddDocumentsHandler<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type UpdateDocumentHandler<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type DeleteDocumentHandler<T> = {
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

const getHandler = <
  DocumentT extends Document,
  ModelT extends Model<DocumentT>
>(
  connection: () => Promise<Mongoose>,
  Model: ModelT
) => {
  const {
    getDocuments,
    getDocument,
    addDocuments,
    updateDocument,
    deleteDocument
  } = getController<DocumentT, ModelT>(
    connection,
    Model
  );

  return {
    getDocuments:
      (args?: GetDocumentsHandler<DocumentT>) =>
      async (
        req: NextRequest
      ): Promise<APIResponse<DocumentT[]>> => {
        try {
          const searchParams =
            extractSearchParams(req);

          const response = await getDocuments(
            searchParams,
            args?.sessionMiddleware,
            args?.responseDataMiddleware,
            args?.attempt
          );

          return Response<DocumentT[]>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    getDocument:
      (args?: GetDocumentHandler<DocumentT>) =>
      async (
        req: NextRequest,
        {
          params: { id }
        }: { params: { id: string } }
      ): Promise<APIResponse<DocumentT>> => {
        try {
          const searchParams =
            extractSearchParams(req);

          const response = await getDocument(
            id,
            searchParams,
            args?.sessionMiddleware,
            args?.responseDataMiddleware,
            args?.attempt
          );

          return Response<DocumentT>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    addDocuments:
      (args?: AddDocumentsHandler<DocumentT>) =>
      async (
        req: NextRequest
      ): Promise<
        APIResponse<
          DocumentT | (DocumentT | null)[]
        >
      > => {
        try {
          const addData =
            await getRequestBody<
              Partial<DocumentT>
            >(req);

          const response = await addDocuments(
            addData,
            args?.requestDataMiddleware,
            args?.sessionMiddleware,
            args?.responseDataMiddleware,
            args?.attempt
          );

          return Response<
            DocumentT | (DocumentT | null)[]
          >(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    updateDocument:
      (args?: UpdateDocumentHandler<DocumentT>) =>
      async (
        req: NextRequest,
        {
          params: { id }
        }: { params: { id: string } }
      ): Promise<APIResponse<DocumentT>> => {
        try {
          const searchParams =
            extractSearchParams(req);

          const updateData =
            await getRequestBody<
              Partial<DocumentT>
            >(req);

          const response = await updateDocument(
            id,
            searchParams,
            updateData,
            args?.requestDataMiddleware,
            args?.sessionMiddleware,
            args?.responseDataMiddleware,
            args?.attempt
          );

          return Response<DocumentT>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      },
    deleteDocument:
      (args?: DeleteDocumentHandler<DocumentT>) =>
      async (
        req: NextRequest,
        {
          params: { id }
        }: { params: { id: string } }
      ): Promise<APIResponse<DocumentT>> => {
        try {
          const searchParams =
            extractSearchParams(req);

          const response = await deleteDocument(
            id,
            searchParams,
            args?.sessionMiddleware,
            args?.responseDataMiddleware,
            args?.attempt
          );

          return Response<DocumentT>(response);
        } catch (error: any) {
          console.error("Error", error);

          return Response<null>(
            serverErrorResponse
          );
        }
      }
  };
};

export default getHandler;
