// utils
import getQuery from "./getQuery";
import { handleError } from "./error";
import isAsync from "./isAsync";
import { successData } from "./data";
import withSession from "./withSession";

// constants
import {
  badRequestErrorResponse,
  notFoundErrorResponse
} from "../constants/errorResponse";

// types
import {
  type Document,
  type Model,
  type Mongoose
} from "mongoose";
import {
  type Middleware,
  type SessionMiddleware
} from "../types/mongoose";
import { type MongooseError } from "../types/error";
import { type Response } from "../types/response";
import { type SearchParams } from "../types/searchParam";

const getController = <
  DocumentT extends Document,
  ModelT extends Model<DocumentT>
>({
  connection,
  Model
}: {
  connection: () => Promise<Mongoose>;
  Model: ModelT;
}) => ({
  getDocuments: async (
    searchParams: SearchParams,
    sessionMiddleware?: SessionMiddleware<
      DocumentT[]
    >,
    responseDataMiddleware?: Middleware<
      DocumentT[]
    >,
    attempt?: number
  ): Promise<Response<DocumentT[]>> => {
    const {
      filter,
      sort,
      offset,
      limit,
      select,
      populate
    } = getQuery(searchParams);

    try {
      const [count, documents] =
        await withSession<[number, DocumentT[]]>(
          connection,
          [NaN, []],
          async (session) => {
            const [
              sessionCount,
              sessionDocuments
            ] = await Promise.all([
              await Model.find(filter)
                .session(session)
                .countDocuments(),
              await Model.find(filter)
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .select(select)
                .populate(populate)
                .session(session)
            ]);

            let newSessionDocuments: DocumentT[] =
              sessionDocuments as DocumentT[];

            newSessionDocuments =
              sessionMiddleware
                ? isAsync(sessionMiddleware)
                  ? await sessionMiddleware(
                      newSessionDocuments,
                      session
                    )
                  : (sessionMiddleware(
                      newSessionDocuments,
                      session
                    ) as DocumentT[])
                : sessionDocuments;

            return [
              sessionCount,
              newSessionDocuments
            ];
          },
          attempt
        );

      const responseDocuments =
        responseDataMiddleware
          ? isAsync(responseDataMiddleware)
            ? await responseDataMiddleware(
                documents
              )
            : (responseDataMiddleware(
                documents
              ) as DocumentT[])
          : documents;

      return successData<DocumentT[]>(
        responseDocuments as DocumentT[],
        count
      );
    } catch (error) {
      return handleError(error as MongooseError);
    }
  },
  getDocument: async (
    documentId: string,
    searchParams: SearchParams,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<Response<DocumentT>> => {
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
        return notFoundErrorResponse;
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

      return successData<DocumentT>(
        responseDocument
      );
    } catch (error: any) {
      return handleError(error as MongooseError);
    }
  },
  addDocuments: async (
    addData: Partial<DocumentT | DocumentT[]>,
    requestDataMiddleware?: Middleware<DocumentT>,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<
    Response<DocumentT | (DocumentT | null)[]>
  > => {
    const addDocument = async (
      data: Partial<DocumentT>
    ) => {
      try {
        const requestData = requestDataMiddleware
          ? isAsync(requestDataMiddleware)
            ? await requestDataMiddleware(
                data as DocumentT
              )
            : (requestDataMiddleware(
                data as DocumentT
              ) as DocumentT)
          : data;

        const newDocument = new Model(
          requestData
        );

        const document =
          await withSession<DocumentT | null>(
            connection,
            null,
            async (session) => {
              const sessionDocument =
                await newDocument.save({
                  session
                });

              let newSessionDocument: DocumentT =
                sessionDocument as DocumentT;

              newSessionDocument =
                sessionMiddleware
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
          return badRequestErrorResponse;
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

        return successData<DocumentT>(
          responseDocument
        );
      } catch (error: unknown) {
        return handleError(
          error as MongooseError
        );
      }
    };

    if (Array.isArray(addData)) {
      const promises = addData.map(
        async (data) =>
          await addDocument(data as DocumentT)
      );

      const results = await Promise.all(promises);

      const response: Response<
        (DocumentT | null)[]
      > = {
        status: 200,
        data: {
          data: [],
          messages: []
        }
      };

      for (let {
        status,
        data: { data, messages }
      } of results) {
        if (
          status !== 200 &&
          response.status === 200
        ) {
          response.status = 207;
        }

        response.data.data?.push(
          data as DocumentT | null
        );
        response.data.messages.push(...messages);
      }

      return response;
    } else {
      return await addDocument(addData);
    }
  },
  updateDocument: async (
    documentId: string,
    searchParams: SearchParams,
    updateData: Partial<DocumentT>,
    requestDataMiddleware?: Middleware<DocumentT>,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<Response<DocumentT>> => {
    const { filter, select, populate } = getQuery(
      searchParams,
      documentId
    );

    try {
      const requestData = requestDataMiddleware
        ? isAsync(requestDataMiddleware)
          ? await requestDataMiddleware(
              updateData as DocumentT
            )
          : (requestDataMiddleware(
              updateData as DocumentT
            ) as DocumentT)
        : updateData;

      const document =
        await withSession<DocumentT | null>(
          connection,
          null,
          async (session) => {
            const sessionDocument =
              await Model.findOneAndUpdate(
                filter,
                requestData,
                {
                  new: true,
                  session
                }
              )
                .select(select)
                .populate(populate);

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
        return notFoundErrorResponse;
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

      return successData<DocumentT>(
        responseDocument
      );
    } catch (error) {
      return handleError(error as MongooseError);
    }
  },
  deleteDocument: async (
    documentId: string,
    searchParams: SearchParams,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<Response<DocumentT>> => {
    const { filter } = getQuery(
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
              await Model.findOneAndDelete(
                filter,
                {
                  new: true,
                  session
                }
              );

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
        return notFoundErrorResponse;
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

      return successData<DocumentT>(
        responseDocument
      );
    } catch (error) {
      return handleError(error as MongooseError);
    }
  }
});

export default getController;
