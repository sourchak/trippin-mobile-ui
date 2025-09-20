// libraries
import {
  model as mongooseModel,
  models as mongooseModels
} from "mongoose";

// schemas
import { transactionSchema } from "./schema/collections/transaction";
import { tripSchema } from "./schema/collections/trip";

// types
import {
  type TransactionDocument,
  type TransactionModel
} from "@/types/documents/collections/transaction";
import {
  TripDocument,
  type TripModel
} from "@/types/documents/collections/trip";
import {
  UserDocument,
  type UserModel
} from "@/types/documents/collections/user";
import { userSchema } from "./schema/collections/user";

// model type
interface Models {
  Transactions: TransactionModel;
  Trips: TripModel;
  Users: UserModel;
}

// models
const models: Models = {
  Transactions:
    (mongooseModels.Transaction as TransactionModel) ||
    mongooseModel<
      TransactionDocument,
      TransactionModel
    >("Transaction", transactionSchema),
  Trips:
    (mongooseModels.Trip as TripModel) ||
    mongooseModel<TripDocument, TripModel>(
      "Trip",
      tripSchema
    ),
  Users:
    (mongooseModels.User as UserModel) ||
    mongooseModel<UserDocument, UserModel>(
      "User",
      userSchema
    )
};

export default models;
