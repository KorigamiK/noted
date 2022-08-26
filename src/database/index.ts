import db from "./connection.ts";
import { Note, UserSchema } from "./schema.ts";

export const USERS = db.collection<UserSchema>("USERS");
export const NOTES = db.collection<Note>("NOTES");
