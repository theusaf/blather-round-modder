import React from "react";
import { Labrada } from "next/font/google";

const inter = Labrada({
  subsets: ["latin"],
  weight: "500",
});

export default function Home() {
  return (
    <>
      <p className="sm:hidden">
        This application is best viewed on a desktop screen size.
      </p>
      <header className={`${inter.className} uppercase flex px-2`}>
        <div className="flex-1 flex flex-row items-center pt-6 pb-6">
          <h1 className="lg:text-5xl md:text-3xl text-2xl text-center flex-1">
            <div className="rounded-2xl border-solid border-4 flex-1 w-9/12 m-auto py-8">
              <span>Blather 'Round</span>
              <br />
              <span>Editor</span>
            </div>
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
      <main className="w-full flex-1 px-1">Lorem Ipsum</main>
    </>
  );
}
