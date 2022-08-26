/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Note } from "@src/database/schema.ts";
import { getNoteFromId } from "@src/database/notesController.ts";
import NoteView from "../../../islands/NoteView.tsx";
import { getCookies } from "@src/deps.ts";
import { Me } from "@src/database/userController.ts";
import { UserSchema } from "@src/database/schema.ts";

interface PageParams {
  noteId: string;
}

interface Props {
  note?: Note;
  editable?: boolean;
}

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const { noteId } = ctx.params as unknown as PageParams;
    try {
      const session = getCookies(_req.headers);
      const jwt = session.jwt;
      let user: Omit<UserSchema, "password"> | undefined;
      if (jwt) {
        user = await Me(jwt);
      }
      const { note, editable } = await getNoteFromId(noteId, user?._id);
      return ctx.render({ note, editable });
    } catch (e) {
      return ctx.render({ note: undefined });
    }
  },
};

export default function Greet(props: PageProps<Props>) {
  if (props.data.note) {
    return (
      <>
        <NoteView {...props.data.note} />
        {props.data.editable && <button>Edit</button>}
      </>
    );
  } else return <div>Note Found</div>;
}
