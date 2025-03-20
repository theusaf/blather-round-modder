"use client";
import type {
	PromptType,
	SentenceStructureType,
	WordListType,
} from "@/lib/types/blather";
import type { ProjectType } from "@/lib/types/project";
import { useContext, useState } from "react";
import { ProjectContext } from "../ProjectContext";
import { toShuffled } from "@/lib/util/shuffle";

const PLAYER_GUESS: WordListType = {
	amount: "",
	placeholder: "SOMETHING",
	id: "00000",
	optional: false,
	name: "PLAYERGUESS",
	maxChoices: "1",
	words: [
		{
			alwaysChoose: true,
			word: "EXAMPLE",
		},
	],
};

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
	const [activeStructureIndex, setActiveStructureIndex] = useState(0);
	const [activeListIndex, setActiveListIndex] = useState(0);
	const [isResponse, setIsResponse] = useState(false);
	const [response, setResponse] = useState(responseLists[0]);
	const [filled, setFilled] = useState<string[][]>([]);
	const listMap: Record<string, WordListType> = {};
	for (const list of project.wordLists) {
		listMap[list.name] = list;
	}

	let content = "";
	let isInList = false;
	const items: (string | [string])[] = [];
	const lists = items
		.filter((a) => Array.isArray(a))
		.map((a) => {
			if (a[0] === "PLAYERGUESS") return PLAYER_GUESS;
			return listMap[a[0]];
		})
		.filter(Boolean);
	const usedSentence = isResponse
		? `<${response}> <PLAYERGUESS>`
		: currentSentence;
	for (let i = 0; i < usedSentence.length; i++) {
		if (usedSentence[i] === "<") {
			if (content) items.push(content);
			isInList = true;
			content = "";
		} else if (usedSentence[i] === ">" && isInList) {
			isInList = false;
			items.push([content]);
			content = "";
		} else {
			if (content === " ") continue;
			content += usedSentence[i];
			if (content === "PLAYERGUESS" && !isInList) {
				items.push([content]);
				content = "";
			}
		}
	}
	if (isInList) content = `<${content}`;
	if (content === "PLAYERGUESS" && !isInList) {
		items.push([content]);
	} else {
		items.push(content);
	}

	let colorCount = 0;
	let listCount = 0;

	return (
		<div className="md:w-[40rem] md:mx-auto overflow-hidden h-full flex flex-col gap-2">
			<h3 className="text-2xl font-black text-center">
				describe {prompt.password}
			</h3>
			<div className="bg-white p-8 flex items-center content-center flex-col text-black text-3xl font-bold">
				<div>
					{items.map((item, i) => {
						if (Array.isArray(item)) {
							let list = listMap[item[0]];
							if (item[0] === "PLAYERGUESS") {
								list = PLAYER_GUESS;
							}
							if (list) {
								let color = "b-black";
								let content = list.name;
								if (list.placeholder) content = list.placeholder;
								if (filled[listCount]) content = filled[listCount].join(" ");
								if (list.optional) {
									color = "border-gray-400";
								} else {
									if (colorCount === 0) {
										color = "border-pink-400 text-pink-400";
									} else if (colorCount === 1) {
										color = "border-orange-400 text-orange-400";
									} else {
										color = "border-blue-400 text-blue-400";
									}
									colorCount++;
								}
								if (filled[listCount]) color += " text-black!";
								const count = listCount;
								listCount++;
								return (
									<button
										type="button"
										key={i}
										className={`border-b-4 uppercase ${color}`}
										onClick={() => {
											setActiveListIndex(count);
										}}
									>
										{content}
									</button>
								);
							}
						}
						return <span key={i}>{item}</span>;
					})}
				</div>
			</div>
			<div className="flex gap-2 overflow-auto h-full">
				<div className="flex-1">test</div>
				<div className="flex-1">test</div>
			</div>
			<div className="text-center">
				<button
					className="text-3xl font-semibold uppercase p-4 w-full bg-emerald-600 rounded-lg"
					type="button"
					onClick={() => {
						setIsResponse(!isResponse);
						setActiveListIndex(0);
						setFilled([]);
						if (!isResponse) {
							setResponse(toShuffled(responseLists)[0]);
						}
					}}
				>
					skip
				</button>
			</div>
		</div>
	);
}

function WordSelectionList({ list }: { list: WordListType }) {}
