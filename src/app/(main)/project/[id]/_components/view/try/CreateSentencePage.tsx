"use client";
import type {
	PromptType,
	SentenceStructureType,
	WordListType,
} from "@/lib/types/blather";
import type { ProjectType } from "@/lib/types/project";
import { useContext, useState } from "react";
import { ProjectContext } from "../ProjectContext";

export function CreateSentencePage({
	prompt,
	onBack,
}: { prompt: PromptType; onBack: () => void }) {
	const project = useContext(ProjectContext);
	if (!project) return;
	const { sentenceStructures, wordLists } = project;
	const { subcategory, category } = prompt;
	const relevantStructure = sentenceStructures.find(
		(s) => s.category === prompt.category,
	);
	const responseWordLists = wordLists
		.filter((list) => {
			if (list.name === "response-sentence") return true;
			if (list.name === `response-sentence-${category}`) return true;
			if (list.name === `response-sentence-${category}-${subcategory}`)
				return true;
			if (list.name === "response-sentence-clue") return true;
			return false;
		})
		.map((a) => a.name);
	const content = !relevantStructure ? (
		<p>No relevant sentence structures found</p>
	) : (
		<CreateSentencePageContent
			prompt={prompt}
			project={project}
			structure={relevantStructure}
			responseLists={responseWordLists}
		/>
	);
	return (
		<div className="bg-slate-600 p-2 h-full flex flex-col gap-2 uppercase">
			<button type="button" className="underline" onClick={onBack}>
				Select a different prompt
			</button>
			{content}
		</div>
	);
}
function CreateSentencePageContent({
	prompt,
	structure,
	responseLists,
	project,
}: {
	prompt: PromptType;
	project: ProjectType;
	structure: SentenceStructureType;
	responseLists: string[];
}) {
	const [currentSentence, setCurrentSentence] = useState(
		structure.structures[0] ?? "",
	);
	const [activeIndex, setActiveIndex] = useState(0);
	const listMap: Record<string, WordListType> = {};
	for (const list of project.wordLists) {
		listMap[list.name] = list;
	}

	return (
		<div className="md:w-[40rem] md:mx-auto overflow-hidden h-full flex flex-col gap-2">
			<h3 className="text-2xl font-black text-center">
				describe {prompt.password}
			</h3>
			<div className="bg-white p-8 flex items-center content-center flex-col text-black text-3xl font-bold">
				<div>foobar</div>
			</div>
			<div className="flex gap-2 overflow-auto">
				<div className="flex-1 h-[100rem]">test</div>
				<div className="flex-1">test</div>
			</div>
			<div className="text-center">
				<button
					className="text-3xl font-semibold uppercase p-4 w-full bg-emerald-600 rounded-lg"
					type="button"
				>
					skip
				</button>
			</div>
		</div>
	);
}
