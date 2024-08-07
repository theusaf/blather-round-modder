import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import UserLoginHandler from "@/lib/components/UserLoginHandler";
import { getUserSession } from "@/lib/util/auth";

const mainFont = Montserrat({ subsets: ["latin"] });

export const viewport: Viewport = {
	themeColor: "#f9fafb",
};

export const metadata: Metadata = {
	title: "Editor for Blather Round",
	description:
		"Blather Round Editor is a web application that allows users to create and edit custom projects for the game Blather 'Round by Jackbox Games.",
	keywords: [
		"Blather Round",
		"Jackbox Games",
		"editor",
		"custom",
		"projects",
		"mod",
		"prompts",
	],
	appleWebApp: true,
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
