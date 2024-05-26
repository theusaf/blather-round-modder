import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import UserLoginHandler from "@/lib/components/UserLoginHandler";
import { getUserSession } from "@/lib/util/auth";

const mainFont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Final Project - Editor for Blather Round",
  description: "Daniel Lau, Oregon State University",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userDetails = await getUserSession();

  return (
    <html lang="en">
      <body className={mainFont.className}>
        <UserLoginHandler
          loginDetails={{
            loggedIn: userDetails !== null,
            ...userDetails,
          }}
        >
          {children}
        </UserLoginHandler>
      </body>
    </html>
  );
}
