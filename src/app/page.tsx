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
      <main className="w-full flex-1 px-1">
        <h2 className="text-xl">What is this exactly?</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum ut
          placeat eligendi ex? Quam ea neque voluptatibus quos minus adipisci?
          Iusto soluta perspiciatis blanditiis sit veritatis at quam, hic sed!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          sed incidunt enim? Tempora veritatis sit quo corporis repellendus
          mollitia. Sunt eos reiciendis eaque quis aut in quaerat doloribus iure
          porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
          nemo blanditiis nisi architecto ea distinctio similique beatae cumque
          doloribus officia? Sit illo veritatis itaque corporis iure possimus
          ratione magni aspernatur!
        </p>
        <h2 className="text-xl">How to Use</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quas
          dolores porro, quos recusandae tempore distinctio. Non deleniti sunt
          qui dolores voluptate, fuga nihil ullam molestiae quae iusto
          laudantium at. Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Perspiciatis autem aut blanditiis quis atque. Consequatur earum
          hic quas eos maxime rem amet? Quod assumenda error dolor illo
          consectetur sunt totam! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolorum error libero perferendis sit ab! Nulla illo
          ducimus, nostrum eligendi necessitatibus vero, consequatur iste
          laborum nam nisi exercitationem qui reiciendis adipisci.
        </p>
        <h2 className="text-xl">Screenshots</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
          dignissimos culpa vel quis maxime maiores illo repellendus distinctio
          non, dolorem soluta fuga veritatis odit aliquid officiis porro itaque
          aspernatur rem. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Cumque, iusto modi. Dolor cupiditate nihil autem excepturi
          voluptatibus pariatur adipisci ipsam minus, alias rem nostrum quos
          facilis culpa ratione earum. Vel.
        </p>
      </main>
    </>
  );
}
