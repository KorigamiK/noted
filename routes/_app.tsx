/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Hello world!" />
        <title>Noted 🗒</title>
      </Head>
      <props.Component />
      <Footer />
    </>
  );
}
