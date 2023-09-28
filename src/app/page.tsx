import React from "react";
import { Labrada } from "next/font/google";

const inter = Labrada({
  subsets: ["latin"],
  weight: "500",
});

export default function Home() {
  return (
    <>
      <header className={`${inter.className} uppercase flex px-2`}>
        <div className="flex-1 flex flex-row items-center pt-6 pb-6">
          <h1 className="lg:text-5xl md:text-3xl text-2xl">
            <span>Blather 'Round</span>
            <br />
            <span>Editor</span>
          </h1>
        </div>
        <div className="flex-1">
          <p>It's a good electronic device thing.</p>
          <p>
            It adds lots of new blanks to your fun activity for the 7th box
            game.
          </p>
          <p>Woah! A blanky price!</p>
        </div>
      </header>
      <main className="w-full flex-1 px-1">
        Lorem Ipsum
      </main>
    </>
  );
}
