import type { ContributionDocument } from "./contribution";
import type { ParticipationDocument } from "./participation";
import type { TransactionDocument } from "./transaction";
import type { UserDocument } from "./user";

export type TripDocument = {
  id: string;

  ownerId: string;
  title: string;
  description?: string | null;
  date: Date;

  owner: UserDocument;
  members: UserDocument[];
  transactions: TransactionDocument[];
  contributions: ContributionDocument[];
  participation: ParticipationDocument[];

  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};
