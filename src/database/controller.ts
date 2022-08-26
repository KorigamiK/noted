import { USERS } from "./index.ts";

import { Bson } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import {
  compare as comparePromise,
  compareSync,
  hash as hashPromise,
  hashSync,
} from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";
import { create, verify } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { env } from "@src/deps.ts";

export const isRunningInDenoDeploy =
  Deno.env.get("__DENO_DEPLOY__")?.toString() === "true"; // This is crude check for if the code in running in Deno Deploy. It works for now but may not work in the "future.

const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
    new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;

const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
    new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;

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
  let jwt = "";
  try {
    jwt = await create(
      { alg: env.__DEVELOPMENT__ ? "none" : "HS512", typ: "JWT" },
      { _id: user._id },
      SECRET,
    );
  } catch (e) {
    console.log(e);
  }

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

export const IncrementVisit = async (jwt: string) => {
  if (!jwt) console.log("No Json Webtoken Supplied");

  const payload = await verify(jwt, SECRET);

  if (!payload) console.log("Unauthenticated");

  const { _id } = (await USERS.findOne({
    _id: new Bson.ObjectId(payload._id as string),
  }))!;

  await USERS.updateOne({ _id }, { $inc: { visits: 1 } });
};
