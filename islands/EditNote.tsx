/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Note } from "@src/database/schema.ts";
import { useState } from "preact/hooks";

export interface NoteData extends Omit<Omit<Note, "updated">, "_id"> {
  updated: string;
  _id: string;
}

export default function NoteView(
  {
    coverImage,
    content,
    description,
    title,
    userId,
    _id,
  }: Partial<Note>,
) {
  const [newCoverImage, setCoverImage] = useState(coverImage);
  const [newContent, setContent] = useState(content);
  const [newDescription, setDescription] = useState(description);
  const [newTitle, setTitle] = useState(title);

  const save = async () => {
    const newNote: NoteData = {
      coverImage: newCoverImage || "",
      content: newContent || "",
      description: newDescription || "",
      title: newTitle || "",
      updated: (new Date()).toISOString(),
      userId: userId!,
      _id: _id?.toString()!,
    };

    await fetch("/api/note/update", {
      method: "POST",
      body: JSON.stringify(newNote),
    });

    window.location.href = window.location.href.replace(/\/edit$\/?/, "");
  };

  return (
    <div class={tw`sm:pt-20 sm:pb-10 pt-40 mx-5`}>
      <div
        class={tw`text-gray-600 relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-24`}
      >
        <div class={tw`px-6`}>
          <div class={tw`flex flex-wrap justify-center`}>
            <div class={tw`w-full flex justify-center`}>
              <div class={tw`relative text-center`}>
                <div
                  style={{ backgroundImage: "url(" + newCoverImage + ")" }}
                  class={tw`bg-cover shadow-xl rounded-full align-center border-none absolute -m-16 lg:-ml-15 max-w-[150px] min-w-[130px] min-h-[130px] pt-11`}
                  onClick={() => {
                    const newUrl = prompt("Enter image URL");
                    if (newUrl) {
                      setCoverImage(newUrl);
                    }
                  }}
                >
                  Change cover image url
                </div>
              </div>
            </div>
            <div class={tw`w-full text-center mt-20`}>
              <div class={tw`flex justify-center lg:pt-4 pt-8 pb-0`}>
                <span class={tw`text-sm text-slate-400 block tracking-wide`}>
                  {new Date().toDateString()}
                </span>
              </div>
            </div>
          </div>
          <div class={tw`text-center mt-2`}>
            <input
              type="text"
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
              placeholder="Title"
              value={newTitle}
              class={tw`text-center text-2xl text-slate-700 font-bold leading-normal mb-1`}
            >
            </input>

            <div
              class={tw`text-xs mt-0 mb-2 text-slate-400 font-bold uppercase`}
            >
              <input
                type="text"
                placeholder="Description"
                value={newDescription}
                onChange={(e) =>
                  setDescription((e.target as HTMLInputElement).value)}
                class={tw`text-center  fas fa-map-marker-alt mr-2 text-slate-400 opacity-75`}
              >
              </input>
            </div>
          </div>
          <div class={tw`mt-6 py-6 border-t border-slate-200 text-center`}>
            <div class={tw`flex flex-wrap justify-center`}>
              <div class={tw`w-full px-4`}>
                <input
                  class={tw`text-center font-light leading-relaxed text-slate-600 mb-4`}
                  type="text"
                  placeholder="Content"
                  value={newContent}
                  onChange={(e) =>
                    setContent((e.target as HTMLInputElement).value)}
                >
                </input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class={tw`flex w-16 m-auto items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
      >
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
