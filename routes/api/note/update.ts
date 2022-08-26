import { Handlers } from "$fresh/server.ts";
import { updateNote } from "@src/database/notesController.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/deps.ts";
import { NoteData } from "../../../islands/EditNote.tsx";
import { Note } from "@src/database/schema.ts";

export const handler: Handlers<Record<never, never>> = {
  async POST(req) {
    const data = await req.json() as NoteData;
    console.log(data);
    updateNote(
      {
        ...data,
        _id: new ObjectId(data._id),
        updated: new Date(data.updated),
        userId: new ObjectId(data.userId),
      } as Note,
    );
    return new Response("Update Successful");
  },
};
