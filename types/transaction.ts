import type { ContributionDocument } from "./contribution";
import type { TransactionCategory } from "./enum";
import type { ParticipationDocument } from "./participation";
import type { TripDocument } from "./trip";
import type { UserDocument } from "./user";

export type TransactionDocument = {
  id: string;

  tripId: string;
  ownerId: string;
  title: string;
  category: TransactionCategory;
  date: Date;
  approverId: string;
  isApproved: boolean;

  trip: TripDocument;
  owner: UserDocument;
  approver: UserDocument;
  contributors: ContributionDocument[];
  participants: ParticipationDocument[];

  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};
