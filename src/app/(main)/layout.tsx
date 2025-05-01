import "server-only";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
					<div className="grid grid-flow-col gap-8">
						<div className="flex flex-wrap flex-col gap-4">
							<div>&copy; 2024 Daniel Lau</div>
							<div>
								<Link
									className="flex gap-1 items-center"
									href="https://github.com/theusaf/blather-round-modder"
								>
									<FontAwesomeIcon icon={faGithub} className="h-4" />
									<span>GitHub</span>
								</Link>
							</div>
						</div>
						<div className="flex flex-wrap flex-col gap-4">
							<div>Version {process.env.version}</div>
						</div>
					</div>
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
