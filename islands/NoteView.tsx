/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Note } from "../src/database/schema.ts";

export default function NoteView(
  {
    coverImage,
    updated,
    content,
    description,
    title,
  }: Partial<Note>,
) {
  return (
    <div>
      <div
        class={tw`text-gray-600 relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-24`}
      >
        <div class={tw`px-6`}>
          <div class={tw`flex flex-wrap justify-center`}>
            <div class={tw`w-full flex justify-center`}>
              <div class={tw`relative text-center`}>
                <div
                  style={{
                    backgroundImage: "url(" + coverImage || "/logo.svg" + ")",
                  }}
                  class={tw`shadow-xl rounded-full align-center border-none absolute -m-16 lg:-ml-15 max-w-[150px] min-w-[130px] min-h-[130px]`}
                />
              </div>
            </div>
            <div class={tw`w-full text-center mt-20`}>
              <div class={tw`flex justify-center lg:pt-4 pt-8 pb-0`}>
                <span class={tw`text-sm text-slate-400 block tracking-wide`}>
                  {updated
                    ? new Date(updated?.toString()).toDateString()
                    : "Today"}
                </span>
              </div>
            </div>
          </div>
          <div class={tw`text-center mt-2`}>
            <h3
              class={tw`text-2xl text-slate-700 font-bold leading-normal mb-1`}
            >
              {title || "Untitled"}
            </h3>
            <div
              class={tw`text-xs mt-0 mb-2 text-slate-400 font-bold uppercase`}
            >
              <i
                class={tw`fas fa-map-marker-alt mr-2 text-slate-400 opacity-75`}
              >
              </i>
              {description || "A note created with Noted"}
            </div>
          </div>
          <div class={tw`mt-6 py-6 border-t border-slate-200 text-center`}>
            <div class={tw`flex flex-wrap justify-center`}>
              <div class={tw`w-full px-4`}>
                <p class={tw`font-light leading-relaxed text-slate-600 mb-4`}>
                  {content || "Start editing to see some magic happen!"}
                </p>
                <a
                  href="javascript:;"
                  class={tw`font-normal text-slate-700 hover:text-slate-400`}
                >
                  {/* Follow Account */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
