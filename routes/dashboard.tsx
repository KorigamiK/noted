/** @jsx h */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { IncrementVisit, Me } from "@src/database/userController.ts";
import { UserSchema } from "@src/database/schema.ts";
import { tw } from "@twind";
import type { Note } from "@src/database/schema.ts";
import { getCookies } from "@src/deps.ts";
import { Card } from "../components/Card.tsx";
import { getUserNotes } from "../src/database/notesController.ts";

type Props = { user?: Omit<UserSchema, "password">; notes?: Note[] };

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const session = getCookies(_req.headers);
    const jwt = session.jwt;
    if (jwt) {
      try {
        const user = await Me(jwt);
        await IncrementVisit(jwt);
        const notes = await getUserNotes(user._id);
        return ctx.render({ user, notes });
      } catch (e) {
        console.log(e);
      }
    }
    return ctx.render({});
  },
};

const GoToSignIn = () => (
  <main class={tw`bg-grey-lighter min-h-screen flex flex-col`}>
    <div
      class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
    >
      <h1>Unauthenticated!</h1>
      <div class={tw`text-grey-dark mt-6`}>
        <a
          class={tw`no-underline border-b border-blue text-blue`}
          href="/login"
        >
          Continue to Login
        </a>
      </div>
    </div>
  </main>
);

export default function Greet(props: PageProps<Props>) {
  if (props.data?.user) {
    return (
      <Fragment>
        <div class={tw`text-gray-600 p-6`}>
          <div
            class={tw`container max-w-4xl mx-auto pt-10 md:pt-16 text-center break-normal`}
          >
            <p class={tw`font-extrabold text-3xl md:text-5xl`}>
              Welcome {props.data.user.userName}
            </p>
            <p class={tw`text-sm md:text-2xl text-gray-500`}>
              Your notes
            </p>
          </div>
          <div
            aria-label="group of cards"
            class={tw`focus:outline-none py-8 w-full`}
          >
            {props.data.notes
              ? (
                <div class={tw`lg:flex items-center justify-center w-full`}>
                  {props.data.notes.map((note) => <Card {...note} />)}
                </div>
              )
              : <h1>No notes</h1>}
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <GoToSignIn />;
  }
}
