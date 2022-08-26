/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import Footer from "../components/Footer.tsx";
import { Note } from "../src/database/schema.ts";

export default function NoteView(props: Partial<Note>) {
  return (
    <Fragment>
      <div
        class={tw`text-gray-600 relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-24`}
      >
        <div class={tw`px-6`}>
          <div class={tw`flex flex-wrap justify-center`}>
            <div class={tw`w-full flex justify-center`}>
              <div class={tw`relative`}>
                <img
                  src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                  class={tw`shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]`}
                />
              </div>
            </div>
            <div class={tw`w-full text-center mt-20`}>
              <div class={tw`flex justify-center lg:pt-4 pt-8 pb-0`}>
                <div class={tw`p-3 text-center`}>
                  <span
                    class={tw`text-xl font-bold block uppercase tracking-wide text-slate-700`}
                  >
                    3,360
                  </span>
                  <span class={tw`text-sm text-slate-400`}>Photos</span>
                </div>
                <div class={tw`p-3 text-center`}>
                  <span
                    class={tw`text-xl font-bold block uppercase tracking-wide text-slate-700`}
                  >
                    2,454
                  </span>
                  <span class={tw`text-sm text-slate-400`}>Followers</span>
                </div>

                <div class={tw`p-3 text-center`}>
                  <span
                    class={tw`text-xl font-bold block uppercase tracking-wide text-slate-700`}
                  >
                    564
                  </span>
                  <span class={tw`text-sm text-slate-400`}>Following</span>
                </div>
              </div>
            </div>
          </div>
          <div class={tw`text-center mt-2`}>
            <h3
              class={tw`text-2xl text-slate-700 font-bold leading-normal mb-1`}
            >
              Mike Thompson
            </h3>
            <div
              class={tw`text-xs mt-0 mb-2 text-slate-400 font-bold uppercase`}
            >
              <i
                class={tw`fas fa-map-marker-alt mr-2 text-slate-400 opacity-75`}
              >
              </i>Paris, France
            </div>
          </div>
          <div class={tw`mt-6 py-6 border-t border-slate-200 text-center`}>
            <div class={tw`flex flex-wrap justify-center`}>
              <div class={tw`w-full px-4`}>
                <p class={tw`font-light leading-relaxed text-slate-600 mb-4`}>
                  An artist of considerable range, Mike is the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm.
                </p>
                <a
                  href="javascript:;"
                  class={tw`font-normal text-slate-700 hover:text-slate-400`}
                >
                  Follow Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
