// types
import {
  type ClientSession,
  type Mongoose
} from "mongoose";

const withSession = async <T>(
  connection: () => Promise<Mongoose>,
  initial: T,
  callback: (
    session: ClientSession
  ) => Promise<T>,
  attempt?: number
): Promise<T> => {
  let result: T = initial;

  const session = await (
    await connection()
  ).startSession();

  let isOrderGenerated = false;
  let attemptCount = 1;

  while (
    isOrderGenerated === false &&
    attemptCount <= (attempt ? attempt : 1)
  ) {
    await session.withTransaction(async () => {
      try {
        result = await callback(session);

        await session.commitTransaction();

        isOrderGenerated = true;
      } catch (error) {
        await session.abortTransaction();

        if (
          attemptCount === (attempt ? attempt : 1)
        ) {
          await session.endSession();

          throw error;
        }

        attemptCount += 1;
      }
    });
  }

  await session.endSession();

  return result;
};

export default withSession;
