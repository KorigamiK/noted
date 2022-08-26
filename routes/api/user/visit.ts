import { Handlers } from "$fresh/server.ts";

import { Status } from "@src/deps.ts";
import { IncrementVisit } from "@src/database/userController.ts";
import { WithSession } from "https://deno.land/x/fresh_session@0.1.7/mod.ts";

export const handler: Handlers<
  Record<never, never>,
  WithSession
> = {
  async GET(_, ctx) {
    const jwt = ctx.state?.session?.get("jwt");
    if (!jwt) return new Response("", { status: Status.Unauthorized });
    try {
      await IncrementVisit(jwt);
      return new Response("", { status: Status.OK });
    } catch (e) {
      return new Response(e.message, { status: Status.Unauthorized });
    }
  },
};
