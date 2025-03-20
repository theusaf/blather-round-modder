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
		<div>
			<h5 className="text-md font-semibold">Prompts</h5>
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
