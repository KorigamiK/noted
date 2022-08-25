/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.7/mod.ts";
import { tw } from "@twind";
import { Login } from "@src/database/controller.ts";

export type Data = { success?: boolean; message?: string };

export const handler: Handlers<
  Data,
  WithSession
> = {
  async POST(req, ctx) {
    const params = new URLSearchParams(await req.text());
    const session = ctx.state?.session;
    console.log(session.get("jwt"));
    let message = "";

    const email = params?.get("email");
    const password = params?.get("password");

    if (email && password) {
      let jwt: string | undefined;
      try {
        jwt = await Login({ email, password });
      } catch (e) {
        jwt = undefined;
        message = e.message;
      }
      session.set("jwt", jwt);
      return ctx.render({ success: jwt !== undefined, message });
    }

    return ctx.render({ success: false, message });
  },

  GET(_req, ctx) {
    const session = ctx.state?.session;
    const jwt = session?.get("jwt");
    let success = false;
    if (jwt) {
      success = true;
    }
    return ctx.render({ success });
  },
};

export default function Dashboard({ data }: PageProps<Data>) {
  const inputStyle = tw`block border border-grey-light w-full p-3 rounded mb-4`;
  if (!data?.success) {
    return (
      <div class={tw`bg-grey-lighter min-h-screen flex flex-col`}>
        <form
          class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
          method="POST"
        >
          <div
            class={tw`bg-white px-6 py-8 rounded shadow-md text-black w-full max-w-xl`}
          >
            <h1 class={tw`mb-8 text-3xl text-center`}>Sign up</h1>
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
              class={tw`w-full text-center py-3 rounded bg-lime-300 hover:bg-lime-600 focus:outline-none my-1`}
              type="submit"
            >
              Log In
            </button>
            <h3 class={tw`text-red-400`}>{data?.message && data.message}</h3>
            <div class={tw`text-grey-dark mt-6`}>
              Create an account?
              <a
                class={tw`no-underline border-b border-blue text-blue`}
                href="/signup"
              >
                &nbsp;Sign Up
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
          <h1>Successfully Logged In!</h1>
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
