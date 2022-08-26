import { NOTES } from "@src/database/index.ts";
import { Bson, ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";

export const getNoteFromId = async (id: string) => {
  const note = await NOTES.findOne({ _id: new Bson.ObjectId(id) });
  if (!note) throw new Error("Note not found");
  return note;
};

export const getUserNotes = async (userId: ObjectId) => {
  const notes = await NOTES.find({ userId }).toArray();
  return notes;
};
