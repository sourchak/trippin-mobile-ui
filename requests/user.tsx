import getRequest from "../lib/next-mongoose-api/utils/getRequest";

import { type UserDocument } from "../types/documents/collections/user";

const {
  fetchDocuments,
  fetchDocument,
  addDocuments,
  updateDocument,
  deleteDocument,
} = getRequest<UserDocument>("https://tripping-api.vercel.app/api/user");

export const requestFetchUsers = fetchDocuments;

export const requestFetchUser = fetchDocument;

export const requestAddUsers = addDocuments;

export const requestUpdateUser = updateDocument;

export const requestDeleteUser = deleteDocument;
