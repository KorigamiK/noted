/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { deleteCookie } from "@src/deps.ts";

export const handler: Handlers<Record<never, never>> = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    deleteCookie(resp.headers, "jwt");
    return resp;
  },
};

export default function LogOut({}: PageProps) {
  return (
    <main class={tw`text-gray-600 bg-grey-lighter min-h-screen flex flex-col`}>
      <div
        class={tw`container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
      >
        <h1>Successfully Logged Out!</h1>
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
}
