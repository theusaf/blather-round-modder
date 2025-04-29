"use client";
import { useContext, useState } from "react";
import { ProjectContext } from "./ProjectContext";
import { PromptList } from "./PromptList";

export function PromptView() {
	const project = useContext(ProjectContext);
	const [search, setSearch] = useState("");
	if (!project) return;
	const prompts = search
		? project.prompts.filter((prompt) => {
				const { password, alternateSpellings } = prompt;
				if (password.toLowerCase().includes(search.toLowerCase())) return true;
				if (
					alternateSpellings.find((spelling) =>
						spelling.toLowerCase().includes(search.toLowerCase()),
					)
				) {
					return true;
				}
			})
		: project.prompts;
	return (
		<div className="h-full overflow-hidden" data-id="project-prompt-container">
			<h4 className="text-lg font-bold">Prompts</h4>
			<input
				placeholder="Search"
				className="p-1 rounded-md border-2 border-slate-500 w-full"
				value={search}
				onInput={(evt) => setSearch(evt.currentTarget.value)}
			/>
			<PromptList prompts={prompts} />
		</div>
	);
}
