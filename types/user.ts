import type { ContributionDocument } from "./contribution";
import type { ParticipationDocument } from "./participation";
import type { TransactionDocument } from "./transaction";
import type { TripDocument } from "./trip";

export type UserDocument = {
  id: string;

  mobileNumber: string;
  name: string;
  password: string;

  tripsOwned: TripDocument[];
  tripsMember: TripDocument[];
  transactions: TransactionDocument[];
  transaction: TransactionDocument[];
  contributions: ContributionDocument[];
  participation: ParticipationDocument[];

  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};
