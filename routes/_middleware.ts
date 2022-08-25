import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  cookieSession,
  WithSession,
} from "https://deno.land/x/fresh_session@0.1.7/mod.ts";

export type State = WithSession;

export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  return cookieSession(req, ctx);
}
