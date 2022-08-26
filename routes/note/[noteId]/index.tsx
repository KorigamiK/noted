/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Note } from "@src/database/schema.ts";
import { getNoteFromId } from "@src/database/notesController.ts";
import NoteView from "../../../islands/NoteView.tsx";

interface PageParams {
  noteId: string;
}

interface Props {
  note?: Note;
}

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const { noteId } = ctx.params as unknown as PageParams;
    try {
      const note = await getNoteFromId(noteId);
      return ctx.render({ note });
    } catch (e) {
      return ctx.render({ note: undefined });
    }
  },
};

export default function Greet(props: PageProps<Props>) {
  if (props.data.note) {
    return <NoteView {...props.data.note} />;
  } else return <div>Note Found</div>;
}
