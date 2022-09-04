import { NOTES, USERS } from "@src/database/index.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import type { Note } from "./schema.ts";

export const getNoteFromId = async (id: string, userId?: ObjectId) => {
  const note = await NOTES.findOne({ _id: new ObjectId(id) });
  let editable = false;
  if (userId) {
    if (userId?.toString() === note?.userId.toString()) editable = true;
  }
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

export const deleteANote = async (noteId: string) => {
  const note = await NOTES.findOne({ _id: new ObjectId(noteId) });
  await USERS.updateOne({ _id: note?.userId }, {
    $pull: { noteIds: new ObjectId(noteId) },
  });
  return await NOTES.deleteOne({ _id: new ObjectId(noteId) });
};

export const updateNote = async (note: Note) => {
  return await NOTES.updateOne({ _id: note._id }, {
    $set: { ...note },
  }, { upsert: true });
};

export const heartNote = async (noteId: string, userId: string) => {
  const userObjId = new ObjectId(userId);
  const noteObjId = new ObjectId(noteId);

  const note = await NOTES.findOne({ _id: noteObjId });
  if (!note) throw new Error("Note not found");
  const user = await USERS.findOne({ _id: userObjId });
  if (!user) throw new Error("User not found");

  if (await NOTES.countDocuments({ _id: noteObjId, heartedBy: userObjId })) {
    await NOTES.updateOne({ _id: noteObjId }, {
      $pull: { heartedBy: userObjId },
    });
    await USERS.updateOne({ _id: userObjId }, {
      $pull: { heartedNotes: noteObjId },
    });
    return false;
  } else {
    await NOTES.updateOne({ _id: noteObjId }, {
      $push: { heartedBy: { $each: [userObjId] } },
    });
    await USERS.updateOne({ _id: userObjId }, {
      $push: { heartedNotes: { $each: [noteObjId] } },
    });
    return true;
  }
};
