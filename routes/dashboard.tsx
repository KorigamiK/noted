/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.7/mod.ts";
import { IncrementVisit, Me } from "@src/database/controller.ts";
import { UserSchema } from "@src/database/schema.ts";
import { tw } from "@twind";

type Props = { user?: Omit<UserSchema, "password"> };

export const handler: Handlers<
  Props,
  WithSession
> = {
  async GET(_req, ctx) {
    const session = ctx.state?.session;
    const jwt = session?.get("jwt");
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

export default function Greet(props: PageProps<Props>) {
  if (props.data?.user) {
    return <div>Hello {props.data.user.userName}</div>;
  } else {
    return (
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
  }
}
