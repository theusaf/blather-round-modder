import "./globals.css";
import "./fontawesome.min.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import NextTopLoader from "nextjs-toploader";
import PremidDetector from "../components/premid_detector";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Blather 'Round Editor",
  description:
    "A tool for creating or modifying prompts for the Blather 'Round game in the Jackbox Party Pack 7.",
  category: "Games",
  applicationName: "Blather 'Round Editor",
  keywords:
    "blather round, jackbox, editor, mod, prompt, prompts, game, party pack 7",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#ffffff",
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
        <div className="flex-1 p-2">{children}</div>
        <Footer />
        <NextTopLoader showSpinner={false} />
        <PremidDetector />
      </body>
    </html>
  );
}
