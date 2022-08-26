/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Note } from "@src/database/schema.ts";
import { getNoteFromId } from "@src/database/notesController.ts";
import { getCookies } from "@src/deps.ts";
import { Me } from "@src/database/userController.ts";
import { UserSchema } from "@src/database/schema.ts";
import { tw } from "@twind";
import EditNote from "../../../islands/EditNote.tsx";

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
  if (props.data.editable) {
    return <EditNote {...props.data.note} />;
  } else {
    return (
      <main class={tw`bg-grey-lighter min-h-screen flex flex-col`}>
        <div
          class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
        >
          <h1>Not Sufficient Permissions</h1>
          <div class={tw`text-grey-dark mt-6`}>
            <a
              class={tw`no-underline border-b border-blue text-blue`}
              href="/dashboard"
            >
              Continue to Dashboard
            </a>
          </div>
        </div>
      </main>
    );
  }
}
