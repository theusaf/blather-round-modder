import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blather 'Round Editor",
  description: "A tool for creating or modifying prompts for the Blather 'Round game in the Jackbox Party Pack 7.",
  themeColor: "#fff",
  viewport: "width=device-width, initial-scale=1",
  "category": "Games",
  "applicationName": "Blather 'Round Editor",
  "keywords": "blather round, jackbox, editor, mod, prompt, prompts, game, party pack 7"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`bg-white ${inter.className} min-h-full flex flex-col`}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
