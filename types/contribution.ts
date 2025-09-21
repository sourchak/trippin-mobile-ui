import type { TransactionDocument } from "./transaction";
import type { TripDocument } from "./trip";
import type { UserDocument } from "./user";

export type ContributionDocument = {
  id: string;

  tripId: string;
  transactionId: string;
  contributorId: string;
  amount: number;

  trip: TripDocument;
  transaction: TransactionDocument;
  contributor: UserDocument;

  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};
