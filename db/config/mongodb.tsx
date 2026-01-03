import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI as string; // match .env
const dbName = process.env.MONGODB_DB_NAME as string; // match .env

const client = new MongoClient(uri);
export const database = client.db(dbName);
