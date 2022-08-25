import db from "./connection.ts";
import { UserSchema } from "./schema.ts";

export const USERS = db.collection<UserSchema>("USERS");
