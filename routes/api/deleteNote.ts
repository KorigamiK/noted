import { Handlers } from "$fresh/server.ts";
import { deleteANote } from "../../src/database/notesController.ts";

export const handler: Handlers<Record<never, never>> = {
  async DELETE(req) {
    const { noteId } = await req.json() as { noteId: string };
    await deleteANote(noteId);
    return new Response("Delete Successful");
  },
};
