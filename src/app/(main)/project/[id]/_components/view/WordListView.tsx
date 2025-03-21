"use client";
import { useContext, useState } from "react";
import { ProjectContext } from "./ProjectContext";
import { WordListList } from "./WordListList";

export function WordListView() {
	const project = useContext(ProjectContext);
	const [search, setSearch] = useState("");
	if (!project) return;
	const wordLists = search
		? project.wordLists.filter((list) => {
				const { name, words } = list;
				if (name.toLowerCase().includes(search.toLowerCase())) return true;
				if (
					words.find((word) =>
						word.word.toLowerCase().includes(search.toLowerCase()),
					)
				) {
					return true;
				}
			})
		: project.wordLists;
	return (
		<div className="h-full overflow-hidden">
			<h4 className="text-lg font-bold">Word Lists</h4>
			<input
				placeholder="Search"
				className="p-1 rounded-md border-2 border-slate-500 w-full"
				value={search}
				onInput={(evt) => setSearch(evt.currentTarget.value)}
			/>
			<WordListList wordLists={wordLists} />
		</div>
	);
}
