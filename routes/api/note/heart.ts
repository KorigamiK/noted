import { Handlers } from "$fresh/server.ts";
import { heartNote } from "@src/database/notesController.ts";

export const handler: Handlers<Record<never, never>> = {
  async POST(req) {
    const { noteId, userId } = await req.json() as {
      noteId: string;
      userId: string;
    };
    try {
      const resp = await heartNote(noteId, userId);
      return new Response(
        `Heart ${resp ? "incremented" : "decremented"} Successfully`,
      );
    } catch (e) {
      return new Response(e.message, { status: 400 });
    }
  },
};
