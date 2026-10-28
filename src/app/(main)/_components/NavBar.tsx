import Link from "next/link";
import NavIcon from "@/lib/components/NavIcon";
import { UserNavMenu } from "./UserNavMenu";

export function NavBar() {
	return (
		<nav className="p-4 bg-cyan-900 text-white flex justify-between">
			<div className="flex gap-4 items-center">
				<NavIcon />
				<Link href="/projects">Projects</Link>
			</div>
			<UserNavMenu />
		</nav>
	);
}
