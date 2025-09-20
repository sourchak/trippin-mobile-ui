// utils
import { generateSearchParams } from "./searchParam";

// types
import { type Document } from "mongoose";
import { type Query } from "../types/query";
import { type ResponseData } from "../types/auth";
import { type SearchParams } from "../types/searchParam";

const getAuthRequest = <T extends Document>(
  route: string
) => ({
  register: (data: Partial<T>) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const response: Response = await fetch(
            `${route}/register`,
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
  login: (query: Query<T>, data: Partial<T>) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const searchParams =
            generateSearchParams(
              query as SearchParams
            );

          const response: Response = await fetch(
            `${route}/login${searchParams}`,
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
  validate: (query: Query<T>) => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const searchParams =
            generateSearchParams(
              query as SearchParams
            );

          const response: Response = await fetch(
            `${route}/validate${searchParams}`,
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
  logout: () => {
    return new Promise<ResponseData<T>>(
      async (resolve, reject) => {
        try {
          const response: Response = await fetch(
            `${route}/logout`,
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
  }
});

export default getAuthRequest;
