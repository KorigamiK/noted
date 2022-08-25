import { Status } from "https://deno.land/std@0.147.0/http/http_status.ts";
import {
  deleteCookie,
  getCookies,
  setCookie,
} from "https://deno.land/std@0.148.0/http/cookie.ts";
import { parse as parseQuery } from "https://deno.land/std@0.148.0/node/querystring.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

type Env = {
  __MONGO_DB_URI__: string;
  __DEVELOPMENT__: boolean;
};
let env: Env;

try {
  env = config() as unknown as Env;
} catch (_e) {
  env = Deno.env.toObject() as unknown as Env;
}

// env.__MONGO_DB_URI__ ?? Deno.exit(1);

export { env };

/* return true if contentType is correct else a bad request response*/
const checkContentType = (req: Request, contentType: string) => {
  if (req.headers.get("Content-Type") === "application/" + contentType) {
    return true;
  } else {
    return new Response(null, {
      status: Status.BadRequest,
      statusText: "content type not correct",
    });
  }
};

export {
  checkContentType,
  deleteCookie,
  getCookies,
  parseQuery,
  setCookie,
  Status,
};
