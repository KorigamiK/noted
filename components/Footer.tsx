/** @jsx h */
import { h } from "preact";
import { tw } from "twind";

export default function Footer() {
  return (
    <footer
      class={tw`static bottom-0 text-gray-600 w-full h-14 lg:px-36 md:px-20 sm:px-16 mt-12 px-6 flex items-center justify-center font-base sm:text-base text-sm`}
    >
      &copy; &nbsp;
      <a
        target="_blank"
        href="https://github.com/KorigamiK"
        class={tw`hover:underline font-semibold`}
      >
        KorigamiK &nbsp;
      </a>
      2021 - 2022
    </footer>
  );
}
