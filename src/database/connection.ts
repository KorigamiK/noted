import { MongoClient } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { env } from "@src/deps.ts";

const client = new MongoClient();

await client.connect(env.__MONGO_DB_URI__);

const db = client.database("freshDB");

console.log("[debug] Connected to MongoDB");

export default db;
