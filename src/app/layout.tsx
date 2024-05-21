import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Final Project - Editor for Blather Round",
  description: "Daniel Lau, Oregon State University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-full">
          <nav className="p-4 bg-cyan-900 text-white flex justify-between">
            <div className="flex gap-4 items-center">
              <Link href="/" className="flex gap-2 items-center mr-4">
                <Image
                  src="/images/logo.svg"
                  className="h-12 w-12"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                Editor for Blather Round
              </Link>
              <Link href="/projects">Projects</Link>
            </div>
            <div className="flex items-center">
              <Link href="/login">Login</Link>
            </div>
          </nav>
          <div className="flex-1">{children}</div>
          <footer className="p-8 bg-lime-700 text-white">
            &copy; 2024 Daniel Lau
          </footer>
        </div>
      </body>
    </html>
  );
}
