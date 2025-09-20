// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetTransaction,
  handleUpdateTransaction,
  handleDeleteTransaction
} from "@/app/api/transaction/handler";

// methods
export const GET = handleGetTransaction;

export const PATCH = handleUpdateTransaction;

export const DELETE = handleDeleteTransaction;
