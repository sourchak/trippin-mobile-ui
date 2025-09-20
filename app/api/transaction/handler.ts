// db connection
import connectDB from "../../../db/mongoose";

// libraries
import { getAPIHandler } from "../../../lib/next-mongoose-api";

// models
import MODELS from "../../../db/models";

// types
import {
  type TransactionDocument,
  type TransactionModel,
} from "../../../types/documents/collections/transaction";

// handlers
const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument,
} = getAPIHandler<TransactionDocument, TransactionModel>(
  connectDB,
  MODELS.Transactions
);

// exports
export const handleGetTransactions = getDocuments();

export const handleGetTransaction = getDocument();

export const handleAddTransactions = addDocuments();

export const handleUpdateTransaction = updateDocument();

export const handleDeleteTransaction = deleteDocument();
