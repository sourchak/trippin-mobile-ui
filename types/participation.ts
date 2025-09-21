import type { TransactionDocument } from "./transaction";
import type { TripDocument } from "./trip";
import type { UserDocument } from "./user";

export type ParticipationDocument = {
  id: string;

  tripId: string;
  transactionId: string;
  participantId: string;

  trip: TripDocument;
  transaction: TransactionDocument;
  participant: UserDocument;

  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};
