// libraries
import mongoose, { Mongoose } from "mongoose";

// env variables
const uri: string | undefined =
  process.env.TRIPPING_MONGODB_URI;
const dbName: string | undefined =
  process.env.TRIPPING_MONGODB_DB_NAME;

if (!uri) {
  throw new Error(
    "Please add your TRIPPING_MONGODB_URI to .env"
  );
}

if (!dbName) {
  throw new Error(
    "Please add your TRIPPING_DB_NAME to .env"
  );
}

// cache for the connection
let cachedConn: Mongoose | null = null;
let cachedPromise: Promise<Mongoose> | null =
  null;

const connectDB = async (): Promise<Mongoose> => {
  if (cachedConn) {
    return cachedConn;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(uri as string, {
        dbName,
        minPoolSize: 1,
        maxPoolSize: 3,
        socketTimeoutMS: 60 * 1000,
        serverSelectionTimeoutMS: 60 * 1000,
        maxIdleTimeMS: 1 * 1000
      })
      .then((mongoose) => {
        cachedConn = mongoose;

        return mongoose;
      });
  }

  cachedConn = await cachedPromise;

  return cachedConn;
};

export default connectDB;
