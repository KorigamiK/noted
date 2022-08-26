/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { IncrementVisit, Me } from "@src/database/controller.ts";
import { UserSchema } from "@src/database/schema.ts";
import { tw } from "@twind";
import type { Note } from "@src/database/schema.ts";
import { Timestamp } from "https://deno.land/x/mongo@v0.30.1/deps.ts";
import { getCookies } from "@src/deps.ts";

type Props = { user?: Omit<UserSchema, "password"> };

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const session = getCookies(_req.headers);
    const jwt = session.jwt;
    if (jwt) {
      try {
        const user = await Me(jwt);
        await IncrementVisit(jwt);
        return ctx.render({ user });
      } catch (e) {
        console.log(e);
      }
    }
    return ctx.render({});
  },
};

const someNotds: Note[] = [{
  content: "hello",
  description: "something",
  title: "this is titile",
  updated: new Timestamp(),
}, {
  content: "asdlfjkalskdjlf;a",
  description: "lorem ipsum",
  title: "this is title",
  updated: new Timestamp(),
}];

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

const BookmarkSvg = () => (
  <div role="img" aria-label="bookmark">
    <svg
      class={tw`focus:outline-none`}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
        stroke="#2C3E50"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

const Card = (
  title: string,
  description: string,
  content: string,
  updated: Timestamp,
  imgSrc = "https://cdn.tuk.dev/assets/components/misc/doge-coin.png",
) => {
  return (
    <div
      aria-label="card 1"
      class={tw`focus:outline-none lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded`}
    >
      <div class={tw`flex items-center border-b border-gray-200 pb-6`}>
        <img
          src={imgSrc}
          alt="coin avatar"
          class={tw`w-12 h-12 rounded-full`}
        />
        <div class={tw`flex items-start justify-between w-full`}>
          <div class={tw`pl-3 w-full`}>
            <p
              class={tw`focus:outline-none text-xl font-medium leading-5 text-gray-800`}
            >
              {title}
            </p>
            <p
              class={tw`focus:outline-none text-sm leading-normal pt-2 text-gray-500`}
            >
              {description}
            </p>
          </div>
          <BookmarkSvg />
        </div>
      </div>
      <div class={tw`px-2`}>
        <p
          class={tw`focus:outline-none text-sm leading-5 py-4 text-gray-600`}
        >
          {content}
        </p>
        <div class={tw`focus:outline-none flex`}>
          <div
            class={tw`py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100`}
          >
            #dogecoin
          </div>
          <div>
            {updated.toNumber()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Greet(props: PageProps<Props>) {
  if (props.data?.user) {
    return (
      <div class={tw`p-6`}>
        <h1>Welcome {props.data.user.userName}</h1>
        <div
          aria-label="group of cards"
          class={tw`focus:outline-none py-8 w-full`}
        >
          <div class={tw`lg:flex items-center justify-center w-full`}>
            {someNotds.map((note) =>
              Card(note.title, note.description, note.content, note.updated)
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <GoToSignIn />;
  }
}
