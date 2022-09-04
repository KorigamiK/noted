/** @jsx h */
import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/deps.ts";
import { h } from "preact";
import HeartSvg from "../components/HeartSvg.tsx";
import { tw } from "../utils/twind.ts";

export default function Hearts(
  { noteId, filled, hearted = 0 }: {
    userId?: string;
    noteId?: ObjectId;
    filled?: boolean;
    hearted: number;
  },
) {
  const heartHandler = async () => {
    const resp = await fetch("/api/note/heart", {
      method: "POST",
      body: JSON.stringify({ noteId }),
    });
    if (!resp.ok) {
      console.log("not hearted");
      if (await resp.text() === "No JWT found") {
        window.location.href = "/login";
      }
    } else {
      location.reload();
    }
  };

  return (
    <div class={tw`justify-center flex items-center flex-initial`}>
      <button
        class={tw`flex justify-center text-red-500 hover:bg-red-200 font-bold uppercase px-2 py-2 outline-none focus:outline-none ease-linear transition-all duration-150`}
        type="button"
        onClick={heartHandler}
      >
        <HeartSvg filled={filled} />
        <span>&nbsp;{hearted}</span>
      </button>
    </div>
  );
}
