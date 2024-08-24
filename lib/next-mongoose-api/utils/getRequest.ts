// utils
import { generateSearchParams } from "./searchParam";

// types
import { type Document } from "mongoose";
import { type Query } from "../types/query";
import { type ResponseData } from "../types/response";
import { type SearchParams } from "../types/searchParam";

const getRequest = <T extends Document>(
  route: string
) => ({
  fetchDocuments: (query: Query<T>) => {
    return new Promise<ResponseData<T[]>>(
      async (resolve, reject) => {
        try {
          const searchParams =
            generateSearchParams(
              query as SearchParams
            );

          const response: Response = await fetch(
            `${route}${searchParams}`,
            {
              method: "GET"
            }
          );
          const responseData: ResponseData<T[]> =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          reject({
            data: null,
            status: [
              {
                type: "error",
                message: "Response Error"
              }
            ]
          });
        }
      }
    );
  },
  fetchDocument: (
    id: string,
    query: Query<T>
  ) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const searchParams =
            generateSearchParams(
              query as SearchParams
            );

          const response: Response = await fetch(
            `${route}/${id}${searchParams}`,
            {
              method: "GET"
            }
          );
          const responseData: ResponseData<T> =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          reject({
            data: null,
            status: [
              {
                type: "error",
                message: "Response Error"
              }
            ]
          });
        }
      }
    );
  },
  addDocuments: (data: Partial<T | T[]>) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const response: Response = await fetch(
            route,
            {
              method: "POST",
              body: JSON.stringify(data)
            }
          );
          const responseData: ResponseData<T> =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          reject({
            data: null,
            status: [
              {
                type: "error",
                message: "Response Error"
              }
            ]
          });
        }
      }
    );
  },
  updateDocument: (
    id: string,
    query: Query<T>,
    data: Partial<T>
  ) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const searchParams =
            generateSearchParams(
              query as SearchParams
            );

          const response: Response = await fetch(
            `${route}/${id}${searchParams}`,
            {
              method: "PATCH",
              body: JSON.stringify(data)
            }
          );
          const responseData: ResponseData<T> =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          reject({
            data: null,
            status: [
              {
                type: "error",
                message: "Response Error"
              }
            ]
          });
        }
      }
    );
  },
  deleteDocument: (
    id: string,
    query: Query<T>
  ) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const searchParams =
            generateSearchParams(
              query as SearchParams
            );

          const response: Response = await fetch(
            `${route}/${id}${searchParams}`,
            {
              method: "DELETE"
            }
          );
          const responseData: ResponseData<T> =
            await response.json();

          if (response.ok) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        } catch (error: any) {
          reject({
            data: null,
            status: [
              {
                type: "error",
                message: "Response Error"
              }
            ]
          });
        }
      }
    );
  }
});

export default getRequest;
