"use client";
import { contrastColor } from "contrast-color";

/**
 * A label for the category of a prompt.
 *
 * @param category The category of the prompt.
 */
export function CategoryLabel({ category }: { category: string }) {
	const color = categoryColors[category.toLowerCase()];

	return (
		<div
			style={{
				backgroundColor: color,
				color: contrastColor({
					bgColor: color,
				}),
			}}
			className="p-1 rounded-md text-xs"
		>
			{category}
		</div>
	);
}

const categoryColors: Record<string, string> = {
	thing: "blue",
	place: "green",
	person: "yellow",
	story: "red",
	response: "purple",
};
