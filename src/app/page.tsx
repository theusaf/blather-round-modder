import React from "react";
import { Labrada } from "next/font/google";

const inter = Labrada({
  subsets: ["latin"],
  weight: "500",
});

export default function Home() {
  return (
    <>
      <header
        className={`${inter.className} uppercase bg-sky-950 w-auto px-2 mb-2`}
      >
        <div className="flex m-auto">
          <div className="flex-1 flex flex-row items-center pt-6 pb-6">
            <h1 className="lg:text-5xl md:text-3xl text-2xl text-center flex-1 font-bold max-w-3xl">
              <div className="bg-white rounded-2xl border-solid border-4 flex-1 w-9/12 m-auto py-8">
                <span>Blather &rsquo;Round</span>
                <br />
                <span>Editor</span>
              </div>
            </h1>
          </div>
          <div className="hidden pt-6 pb-6 sm:flex items-center">
            <div>
              <p
                className="font-semibold text-lg mb-2 opacity-50"
                style={{
                  transform:
                    "rotate(-9deg) scale(.6) translateX(-50%) translateY(-4rem)",
                }}
              >
                <span className="bg-white p-2">
                  It&apos;s a good electronic device contraption.
                </span>
              </p>
              <p
                className="font-semibold text-lg mb-2 opacity-70"
                style={{
                  transform:
                    "rotate(-7deg) scale(.8) translateX(-19%) translateY(-2rem)",
                }}
              >
                <span className="bg-white p-2">
                  It adds lots of new blanks to the{" "}
                  <span className="text-lime-600">7th box game</span>.
                </span>
              </p>
              <p
                className="font-semibold text-lg"
                style={{
                  transform: "rotate(-5deg)",
                }}
              >
                <span className="bg-white p-2">Woah! A blanky price!</span>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full flex-1 px-1">Lorem Ipsum</main>
    </>
  );
}
