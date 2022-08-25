import { ObjectId, Timestamp } from "https://deno.land/x/mongo@v0.30.1/deps.ts";

export interface UserSchema {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  visits: number;
  notes?: Note[];
}

export interface Note {
  title: string;
  description: string;
  content: string;
  updated: Timestamp;
}
