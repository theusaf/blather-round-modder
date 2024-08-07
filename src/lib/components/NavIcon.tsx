import Link from "next/link";
import Image from "next/image";

/**
 * The application's navigation icon.
 */
export default function NavIcon() {
	return (
		<Link href="/" className="flex gap-2 items-center mr-4">
			<Image
				src="/images/logo.svg"
				className="h-12 w-12"
				alt="Logo"
				width={50}
				height={50}
			/>
			<span className="hidden md:block font-semibold">
				Editor for Blather Round
			</span>
		</Link>
	);
}
