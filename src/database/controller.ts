import { USERS } from "./index.ts";

import { Bson } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { compare, hash } from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";
import { create, verify } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { env } from "@src/deps.ts";

// no secret for development
const SECRET = env.__DEVELOPMENT__
  ? null
  : await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-512" }, true, [
    "sign",
    "verify",
  ]);

type RegisterParamKeys = "userName" | "email" | "password";
export type RegisterParams = {
  [K in RegisterParamKeys]: string;
};

export const Register = async (params: RegisterParams) => {
  const _id = await USERS.insertOne({
    userName: params.userName,
    email: params.email,
    visits: 1,
    password: await hash(params.password),
  });

  const user = (await USERS.findOne({ _id }))!;

  return user;
};

export type LoginParams = { email: string; password: string };

// * returns the jwt for the login session
export const Login = async ({ password, email }: LoginParams) => {
  const user = await USERS.findOne({ email });

  if (!user) throw new Error("Specified User not found");

  if (!(await compare(password, user.password))) {
    throw new EvalError("Password Mismatch");
  }

  const jwt = await create(
    { alg: env.__DEVELOPMENT__ ? "none" : "HS512", typ: "JWT" },
    { _id: user._id },
    SECRET,
  );

  return jwt;
};

export const Me = async (jwt: string) => {
  if (!jwt) throw new Error("No Json Webtoken Supplied");

  const payload = await verify(jwt, SECRET);

  if (!payload) throw new EvalError("Unauthenticated");

  // deno-lint-ignore no-unused-vars
  const { password, ...userData } = (await USERS.findOne({
    _id: new Bson.ObjectId(payload._id as string),
  }))!;

  return userData;
};
