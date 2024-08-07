"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import Link from "next/link";

export function ExitButton() {
	const id = useProjectStore((state) => state.id);

	return (
		<Link
			href={`/project/${id}`}
			onClick={(event) => {
				if (!confirm("Are you sure you want to exit?")) {
					event.preventDefault();
				}
			}}
		>
			<button
				type="button"
				className="p-2 rounded-md bg-slate-200 text-black shadow-sm shadow-slate-700"
			>
				Exit
			</button>
		</Link>
	);
}
