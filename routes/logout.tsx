/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.7/mod.ts";
import { tw } from "@twind";

export const handler: Handlers<
  Record<never, never>,
  WithSession
> = {
  GET(_req, ctx) {
    const session = ctx.state?.session;
    session.clear();
    return ctx.render();
  },
};

export default function Login({}: PageProps) {
  return (
    <main class={tw`bg-grey-lighter min-h-screen flex flex-col`}>
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
