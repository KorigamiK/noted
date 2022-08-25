/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Home() {
  const numberStyle = tw`px-4 text-5xl font-extralight text-neutral-700`;
  const boldStyle = tw`text-xl font-bold text-neutral-800`;
  const paragraphStyle = tw`max-w-xs py-2 text-sm text-neutral-900`;

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div class={tw`p-4 text-gray-600 `}>
        <h1
          class={tw`text-center text-3xl font-bold text-neutral-900 mb-24 mt-24`}
        >
          Noted !
        </h1>

        <ul class={tw`grid place-content-center sm:grid-cols-2 gap-8`}>
          <li class={tw`flex`}>
            <div class={numberStyle}>
              01.
            </div>
            <a href="/signup">
              <div class={boldStyle}>Sign Up</div>
              <p class={paragraphStyle}>
                We would love to have you on board. Sign up and start using
                Noted!
              </p>
            </a>
          </li>
          <li class={tw`flex`}>
            <div class={numberStyle}>
              02.
            </div>
            <a href="/login">
              <div class={boldStyle}>Log In</div>
              <p class={paragraphStyle}>
                Just some quick steps to get you started. Log in and start using
                Noted!
              </p>
            </a>
          </li>
          <li class={tw`flex`}>
            <div class={numberStyle}>
              03.
            </div>
            <a href="/dashboard">
              <div class={boldStyle}>Note</div>
              <p class={paragraphStyle}>
                Design, brainstorm and write your notes. Share them with your
                friends and family!
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
