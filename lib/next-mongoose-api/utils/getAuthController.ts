// utils
import getQuery from "./getQuery";
import { handleError } from "./error";
import isAsync from "./isAsync";
import { successData } from "./data";
import withSession from "./withSession";

// constants
import { unauthenticatedErrorResponse } from "../constants/errorResponse";

// types
import {
  type Document,
  type FilterQuery,
  type Model,
  type Mongoose
} from "mongoose";
import {
  type Middleware,
  type SessionMiddleware
} from "../types/mongoose";
import { type MongooseError } from "../types/error";
import { type SearchParams } from "../types/searchParam";

const getAuthController = <
  DocumentT extends Document,
  ModelT extends Model<DocumentT>
>({
  connection,
  Model
}: {
  connection: () => Promise<Mongoose>;
  Model: ModelT;
}) => ({
  register: async ({
    credentials,
    requestDataMiddleware,
    sessionMiddleware,
    responseDataMiddleware,
    attempt
  }: {
    credentials: Partial<DocumentT>;
    requestDataMiddleware?: Middleware<DocumentT>;
    sessionMiddleware?: SessionMiddleware<DocumentT>;
    responseDataMiddleware?: Middleware<DocumentT>;
    attempt?: number;
  }) => {
    try {
      const requestData = requestDataMiddleware
        ? isAsync(requestDataMiddleware)
          ? await requestDataMiddleware(
              credentials as DocumentT
            )
          : (requestDataMiddleware(
              credentials as DocumentT
            ) as DocumentT)
        : credentials;

      const newDocument = new Model(requestData);

      const document =
        await withSession<DocumentT | null>(
          connection,
          null,
          async (session) => {
            const sessionDocument =
              await newDocument.save({ session });

            let newSessionDocument: DocumentT =
              sessionDocument as DocumentT;

            newSessionDocument = sessionMiddleware
              ? isAsync(sessionMiddleware)
                ? await sessionMiddleware(
                    newSessionDocument,
                    session
                  )
                : (sessionMiddleware(
                    newSessionDocument,
                    session
                  ) as DocumentT)
              : newSessionDocument;

            return newSessionDocument;
          },
          attempt
        );

      if (!document) {
        return unauthenticatedErrorResponse;
      }

      const responseDocument =
        responseDataMiddleware
          ? isAsync(responseDataMiddleware)
            ? await responseDataMiddleware(
                document
              )
            : (responseDataMiddleware(
                document
              ) as DocumentT)
          : document;

      if (!responseDocument) {
        return unauthenticatedErrorResponse;
      }

      return successData<DocumentT>(
        responseDocument
      );
    } catch (error: any) {
      return handleError(error as MongooseError);
    }
  },
  login: async ({
    searchParams,
    credentials,
    sessionMiddleware,
    responseDataMiddleware,
    attempt
  }: {
    searchParams: SearchParams;
    credentials: Partial<DocumentT>;
    sessionMiddleware?: SessionMiddleware<DocumentT>;
    responseDataMiddleware?: Middleware<DocumentT>;
    attempt?: number;
  }) => {
    const { select, populate } =
      getQuery(searchParams);

    try {
      const document =
        await withSession<DocumentT | null>(
          connection,
          null,
          async (session) => {
            const sessionDocument =
              await Model.findOne(
                credentials as FilterQuery<DocumentT>
              )
                .select(select)
                .populate(populate)
                .session(session);

            let newSessionDocument: DocumentT =
              sessionDocument as DocumentT;

            newSessionDocument = sessionMiddleware
              ? isAsync(sessionMiddleware)
                ? await sessionMiddleware(
                    newSessionDocument,
                    session
                  )
                : (sessionMiddleware(
                    newSessionDocument,
                    session
                  ) as DocumentT)
              : newSessionDocument;

            return newSessionDocument;
          },
          attempt
        );

      if (!document) {
        return unauthenticatedErrorResponse;
      }

      const responseDocument =
        responseDataMiddleware
          ? isAsync(responseDataMiddleware)
            ? await responseDataMiddleware(
                document
              )
            : (responseDataMiddleware(
                document
              ) as DocumentT)
          : document;

      if (!responseDocument) {
        return unauthenticatedErrorResponse;
      }

      return successData<DocumentT>(
        responseDocument
      );
    } catch (error: any) {
      return handleError(error as MongooseError);
    }
  },
  validate: async ({
    documentId,
    searchParams,
    sessionMiddleware,
    responseDataMiddleware,
    attempt
  }: {
    documentId: string;
    searchParams: SearchParams;
    sessionMiddleware?: SessionMiddleware<DocumentT>;
    responseDataMiddleware?: Middleware<DocumentT>;
    attempt?: number;
  }) => {
    const { filter, select, populate } = getQuery(
      searchParams,
      documentId
    );

    try {
      const document =
        await withSession<DocumentT | null>(
          connection,
          null,
          async (session) => {
            const sessionDocument =
              await Model.findOne(filter)
                .select(select)
                .populate(populate)
                .session(session);

            let newSessionDocument: DocumentT =
              sessionDocument as DocumentT;

            newSessionDocument = sessionMiddleware
              ? isAsync(sessionMiddleware)
                ? await sessionMiddleware(
                    newSessionDocument,
                    session
                  )
                : (sessionMiddleware(
                    newSessionDocument,
                    session
                  ) as DocumentT)
              : newSessionDocument;

            return newSessionDocument;
          },
          attempt
        );

      if (!document) {
        return unauthenticatedErrorResponse;
      }

      const responseDocument =
        responseDataMiddleware
          ? isAsync(responseDataMiddleware)
            ? await responseDataMiddleware(
                document
              )
            : (responseDataMiddleware(
                document
              ) as DocumentT)
          : document;

      if (!responseDocument) {
        return unauthenticatedErrorResponse;
      }

      return successData<DocumentT>(
        responseDocument
      );
    } catch (error: any) {
      return handleError(error as MongooseError);
    }
  }
});

export default getAuthController;
