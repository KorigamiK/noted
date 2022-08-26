import { Handlers } from "$fresh/server.ts";

import { checkContentType, Status } from "@src/deps.ts";
import { Register, RegisterParams } from "@src/database/userController.ts";

export const handler: Handlers = {
  async POST(_request) {
    const contentType = checkContentType(_request, "json");
    if (contentType !== true) return contentType;

    const params: RegisterParams = await _request.json();
    const newUser = await Register(params);

    const resp = new Response(JSON.stringify(newUser), {
      status: Status.Created,
      statusText: "user created",
    });
    resp.headers.set("Content-Type", "application/json");

    return resp;
  },
};
