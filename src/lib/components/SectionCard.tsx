import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * A styled card with a border, shadow, and padding.
 */
export default function SectionCard(
	props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
	return (
		<div
			{...props}
			className={`border-slate-400 border-2 rounded-md shadow-xs shadow-black p-2 ${props.className ?? ""}`}
		/>
	);
}
