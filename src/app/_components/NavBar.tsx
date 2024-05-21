import Link from "next/link";
import Image from "next/image";
import { UserNavMenu } from "./UserNavMenu";

export function NavBar() {
  return (
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
      <UserNavMenu />
    </nav>
  );
}
