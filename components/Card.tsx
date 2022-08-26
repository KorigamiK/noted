/** @jsx h */
import { h } from "preact";
import { Note } from "../src/database/schema.ts";
import { tw } from "../utils/twind.ts";

const ShareSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      fill-rule="evenodd"
      d="M16 1.25v4.146a.25.25 0 01-.427.177L14.03 4.03l-3.75 3.75a.75.75 0 11-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0111.604 1h4.146a.25.25 0 01.25.25zM2.75 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-2.5a.75.75 0 111.5 0v2.5A1.75 1.75 0 0113.25 13H9.06l-2.573 2.573A1.457 1.457 0 014 14.543V13H2.75A1.75 1.75 0 011 11.25v-7.5C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5h-5.5z"
    >
    </path>
  </svg>
);

export const Card = (
  { title, description, coverImage, content, updated, _id }: Note,
) => {
  const noteId = _id;
  return (
    <div
      aria-label="card 1"
      class={tw`focus:outline-none lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded`}
    >
      <div class={tw`flex items-center border-b border-gray-200 pb-6`}>
        <img
          src={coverImage}
          alt="coin avatar"
          class={tw`w-12 h-12 rounded-full`}
        />
        <div class={tw`flex items-start justify-between w-full`}>
          <div class={tw`pl-3 w-full`}>
            <p
              class={tw`focus:outline-none text-xl font-medium leading-5 text-gray-800`}
            >
              {title}
            </p>
            <p
              class={tw`focus:outline-none text-sm leading-normal pt-2 text-gray-500`}
            >
              {description}
            </p>
          </div>
          <a
            role="img"
            class={tw`m-auto cursor-pointer`}
            aria-label="share"
            href={`note/${noteId}`}
          >
            <ShareSvg />
          </a>
        </div>
      </div>
      <div class={tw`px-2`}>
        <p
          class={tw`focus:outline-none text-sm leading-5 py-4 text-gray-600 overflow-hidden truncate`}
        >
          {content}
        </p>
        <div class={tw`focus:outline-none flex`}>
          {
            /* <div
            class={tw`py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100`}
          >
            #dogecoin
          </div> */
          }
          <div class={tw`text-xs`}>
            {(new Date(updated.toString())).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
