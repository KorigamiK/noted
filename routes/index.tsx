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
                We love numbers! We collect data and insights, analyze them then
                take the time to learn about your objectives, ask the right
                questions to understand your business.
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
                Solutions are born from proper research, hard work, and strong
                strategy. We build data-driven roadmaps for every project to
                make pave the way to success.
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
                We design the right solution for your business. We craft
                beautiful, intuitive, and user-friendly interfaces that are easy
                to use and easy to maintain.
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
