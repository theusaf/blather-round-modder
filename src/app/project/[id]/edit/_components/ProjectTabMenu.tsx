"use client";

import type { DetailedHTMLProps, LiHTMLAttributes } from "react";

export function ProjectTabMenu({
	activeTab,
	onTabSelect,
}: {
	activeTab: string;
	onTabSelect: (tab: string) => void;
}) {
	return (
		<menu className="grid grid-flow-col overflow-x-auto whitespace-nowrap md:flex md:justify-normal md:flex-col p-4 bg-cyan-500 text-white text-center">
			<ProjectTabMenuItem
				onClick={() => onTabSelect("prompts")}
				active={activeTab === "prompts"}
			>
				Prompts
			</ProjectTabMenuItem>
			<ProjectTabMenuItem
				onClick={() => onTabSelect("wordLists")}
				active={activeTab === "wordLists"}
			>
				Word Lists
			</ProjectTabMenuItem>
			<ProjectTabMenuItem
				onClick={() => onTabSelect("sentenceStructures")}
				active={activeTab === "sentenceStructures"}
			>
				Sentence Structures
			</ProjectTabMenuItem>
			<ProjectTabMenuItem
				onClick={() => onTabSelect("validation")}
				active={activeTab === "validation"}
			>
				Check for Errors
			</ProjectTabMenuItem>
		</menu>
	);
}

function ProjectTabMenuItem(
	props: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
		active?: boolean;
	},
) {
	const liProps = { ...props };
	delete liProps.active;
	return (
		<li
			{...liProps}
			className={`p-2 hover:bg-cyan-600 cursor-pointer ${props.active ? "bg-cyan-700 underline" : ""} ${props.className ?? ""}`}
		>
			{props.children}
		</li>
	);
}
