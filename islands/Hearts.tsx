/** @jsx h */
import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/deps.ts";
import { Fragment, h } from "preact";
import HeartSvg from "../components/HeartSvg.tsx";
import { tw } from "../utils/twind.ts";

export default function Hearts(
  { userId, noteId, filled, hearted = 0 }: {
    userId?: string;
    noteId?: ObjectId;
    filled?: boolean;
    hearted: number;
  },
) {
  const heartHandler = async () => {
    await fetch("/api/note/heart", {
      method: "POST",
      body: JSON.stringify({ userId, noteId }),
    });
    console.log("hearted");
  };

  return (
    <div class={tw`justify-center flex`}>
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
