import type { ResolvingMetadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
	return {
		title: `${(await parent).title?.absolute} - Register`,
	};
}

export default function RegisterLayout({ children }: { children: ReactNode }) {
	return children;
}
