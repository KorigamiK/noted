/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Register } from "@src/database/controller.ts";
import { UserSchema } from "@src/database/schema.ts";
import { tw } from "@twind";

interface Props {
  success: boolean;
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const url = new URL(req.url);

    const userName = url.searchParams?.get("name");
    const email = url.searchParams?.get("email");
    const password = url.searchParams?.get("password");

    let user: UserSchema | undefined;

    if (userName && email && password) {
      user = await Register({ userName, email, password });
      const resp = await ctx.render({ success: true });
      resp.headers.set("Location", "/login");
      return resp;
    }

    return ctx.render({ success: user !== undefined });
  },
};

export default function Page({ data }: PageProps<Props>) {
  const inputStyle = tw`block border border-grey-light w-full p-3 rounded mb-4`;
  if (!data.success) {
    return (
      <div class={tw`bg-grey-lighter min-h-screen flex flex-col`}>
        <form
          class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
        >
          <div
            class={tw`bg-white px-6 py-8 rounded shadow-md text-black w-full max-w-xl`}
          >
            <h1 class={tw`mb-8 text-3xl text-center`}>Sign up</h1>
            <input
              type="text"
              class={inputStyle}
              name="name"
              placeholder="Your User Name"
            />
            <input
              type="email"
              class={inputStyle}
              name="email"
              placeholder="Your Email"
            />
            <input
              type="password"
              class={inputStyle}
              name="password"
              placeholder="Your password"
            />
            <button
              class={tw`w-full text-center py-3 rounded bg-green hover:bg-green-dark focus:outline-none my-1`}
              type="submit"
            >
              Sign Up
            </button>
            <div class={tw`text-grey-dark mt-6`}>
              Already have an account?
              <a
                class={tw`no-underline border-b border-blue text-blue`}
                href="/login"
              >
                &nbsp;Log in
              </a>.
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <main class={tw`bg-grey-lighter min-h-screen flex flex-col`}>
        <div
          class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
        >
          <h1>You have registered Successfully</h1>
          <div class={tw`text-grey-dark mt-6`}>
            <a
              class={tw`no-underline border-b border-blue text-blue`}
              href="/login"
            >
              Move to the login page!
            </a>
          </div>
        </div>
      </main>
    );
  }
}
