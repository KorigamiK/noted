import { Handlers } from "$fresh/server.ts";
import { heartNote } from "@src/database/notesController.ts";
import { getCookies } from "@src/deps.ts";
import { assert } from "https://deno.land/std@0.148.0/testing/asserts.ts";

import { Me } from "@src/database/userController.ts";

export const handler: Handlers<Record<never, never>> = {
  async POST(req) {
    const session = getCookies(req.headers);
    const jwt = session.jwt;
    try {
      const { noteId } = await req.json() as { noteId: string };
      assert(jwt, "No JWT found");
      assert(noteId, "No NoteId found");
      const { _id } = await Me(jwt);
      const resp = await heartNote(noteId, _id.toJSON());
      return new Response(
        `Heart ${resp ? "incremented" : "decremented"} Successfully`,
      );
    } catch (e) {
      return new Response(e.message, { status: 400 });
    }
  },
};
