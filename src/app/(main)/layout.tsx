import Link from "next/link";
import { NavBar } from "./_components/NavBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="flex-1">{children}</div>
      <footer className="p-8 bg-lime-700 text-white">
        <div className="flex justify-between md:flex-row flex-col">
          <span className="flex items-center">&copy; 2024 Daniel Lau</span>
          <div className="md:w-1/2">
            <span>
              This website is not affiliated, associated with, authorized,
              endorsed by, or in any way officially connected with{" "}
              <Link href="https://www.jackboxgames.com/">Jackbox Games</Link> or
              any of its subsidiaries or affiliates.
            </span>{" "}
            <span>Blather &apos;Round is a trademak of Jackbox Games.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
