/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { Login } from "@src/database/userController.ts";
import { getCookies, setCookie } from "@src/deps.ts";
import { assert } from "https://deno.land/std@0.148.0/testing/asserts.ts";

export type Data = { success?: boolean; message?: string };

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const params = new URLSearchParams(await req.text());

    try {
      const email = params?.get("email");
      const password = params?.get("password");

      assert(email, "email is required");
      assert(password, "password is required");
      const jwt = await Login({ email, password });

      const resp = await ctx.render({
        success: true,
        message: "Login successful",
      });
      resp.headers.set("Location", "/login");
      setCookie(resp.headers, {
        name: "jwt",
        value: jwt,
        sameSite: "Strict",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      return resp;
    } catch (e) {
      console.log(e);
      return ctx.render({ success: false, message: e.message });
    }
  },

  GET(_req, ctx) {
    const cookie = getCookies(_req.headers);
    const jwt = cookie.jwt;
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
      <div class={tw`text-gray-600 bg-grey-lighter min-h-screen flex flex-col`}>
        <form
          class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
          method="POST"
        >
          <div
            class={tw`bg-white px-6 py-8 rounded shadow-md w-full max-w-md`}
          >
            <h1 class={tw`mb-8 text-3xl text-center`}>Log In</h1>
            <input
              type="email"
              class={inputStyle}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              class={inputStyle}
              name="password"
              placeholder="Password"
            />
            <button
              class={tw`w-full text-center text-emerald-400 py-3 rounded bg-lime-300 hover:bg-lime-600 focus:outline-none my-1`}
              type="submit"
            >
              Log In
            </button>
            <h3 class={tw`text-red-400`}>{data?.message && data.message}</h3>
            <div class={tw`text-grey-dark mt-6`}>
              Create an account?
              <a
                class={tw`no-underline border-b border-blue text-emerald-400`}
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
      <main
        class={tw`text-gray-600 bg-grey-lighter min-h-screen flex flex-col`}
      >
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
