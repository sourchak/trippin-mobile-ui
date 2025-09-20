// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddTransactions,
  handleGetTransactions
} from "@/app/api/transaction/handler";

// methods
export const GET = handleGetTransactions;

export const POST = handleAddTransactions;
