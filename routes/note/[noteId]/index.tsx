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
import { tw } from "@twind";

interface PageParams {
  noteId: string;
}

interface Props {
  note?: Note & { heartedBy?: string[] };
  editable?: boolean;
  currentUserId?: string;
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
      return ctx.render({
        note: note as Note & { heartedBy?: string[] },
        editable,
        currentUserId: user?._id.toString(),
      });
    } catch (e) {
      return ctx.render({ note: undefined });
    }
  },
};

export default function NoteID(props: PageProps<Props>) {
  if (props.data.note) {
    return (
      <>
        <NoteView
          {...props.data.note}
          currentUserId={props.data.currentUserId}
        />
        {props.data.editable && (
          <a
            class={tw`flex w-16 m-auto items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
            href={props.data.note._id?.toString() + "/edit"}
          >
            <button>Edit</button>
          </a>
        )}
      </>
    );
  } else return <div>Note Found</div>;
}
