import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import UserLoginHandler from "@/lib/components/UserLoginHandler";
import { decrypt } from "@/lib/util/session";
import { cookies } from "next/headers";

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
  const session = cookies().get("session");
  const userDetails = await decrypt(session?.value);

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
