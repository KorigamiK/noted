import { Handlers } from "$fresh/server.ts";

import { createNewNote } from "../../../src/database/notesController.ts";
import { Status } from "@src/deps.ts";

export const handler: Handlers = {
  async POST(_request) {
    const userID = ((await _request.json()) as { userId: string }).userId;
    return new Response(
      JSON.stringify({ noteId: await createNewNote(userID) }),
      {
        status: Status.OK,
        statusText: "OK",
      },
    );
  },
};
