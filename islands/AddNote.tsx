/** @jsx h */
import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/deps.ts";
import { Fragment, h } from "preact";
import AddSvg from "../components/AddSvg.tsx";
import { tw } from "../utils/twind.ts";

export default function AddNote({ userId }: { userId: ObjectId }) {
  const newNote = async () => {
    const res = await fetch("/api/user/newNote", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    const data: { noteId: string } = await res.json();
    window.location.href = "/note/" + data.noteId + "/edit";
  };

  return (
    <Fragment>
      <div
        class={tw`flex justify-center cursor-pointer mt-2`}
        onClick={newNote}
      >
        <span class={tw`text-xl text-gray-500`}>
          Your notes
        </span>
        <div class={tw`ml-2 pt-1`}>
          <AddSvg />
        </div>
      </div>
      <div class={tw`text-sm text-gray-500 mt-2`}>
        Don't hesitate and share them with your friends!
      </div>
    </Fragment>
  );
}
