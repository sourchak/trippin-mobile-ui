import getRequest from "../lib/next-mongoose-api/utils/getRequest";

import { type TripDocument } from "../types/documents/collections/trip";

const {
  fetchDocuments,
  fetchDocument,
  addDocuments,
  updateDocument,
  deleteDocument,
} = getRequest<TripDocument>("https://tripping-api.vercel.app/api/trip");

export const requestFetchTrips = fetchDocuments;

export const requestFetchTrip = fetchDocument;

export const requestAddTrips = addDocuments;

export const requestUpdateTrip = updateDocument;

export const requestDeleteTrip = deleteDocument;
