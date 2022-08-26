import { NOTES, USERS } from "@src/database/index.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";

export const getNoteFromId = async (id: string, userId?: ObjectId) => {
  const note = await NOTES.findOne({ _id: new ObjectId(id) });
  let editable = false;

  if (userId) if (note?.userId === userId) editable = true;
  if (!note) throw new Error("Note not found");
  return { note, editable };
};

export const getUserNotes = async (userId: ObjectId) => {
  const notes = await NOTES.find({ userId }).toArray();
  return notes;
};

export const createNewNote = async (userId: string) => {
  const newNote = await NOTES.insertOne({
    userId: new ObjectId(userId),
    content: "",
    title: "",
    description: "",
    updated: new Date(),
    coverImage: "",
  });
  await USERS.updateOne({ _id: new ObjectId(userId) }, {
    $push: { noteIds: { $each: [newNote] } },
  });
  return newNote;
};
