import type { ReactNode } from "react";

export function ItemBlock({ children }: { children: ReactNode }) {
	return (
		<div className="border-2 border-slate-300 p-1 rounded">{children}</div>
	);
}
