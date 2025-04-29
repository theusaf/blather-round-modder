"use client";
import type {
	PromptType,
	SentenceStructureType,
	WordListType,
} from "@/lib/types/blather";
import type { ProjectType } from "@/lib/types/project";
import { chance } from "@/lib/util/chance";
import { getListMaps } from "@/lib/util/list";
import { toShuffled } from "@/lib/util/shuffle";
import { produce } from "immer";
import { useCallback, useContext, useMemo, useState } from "react";
import { ProjectContext } from "../ProjectContext";

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
		{
			alwaysChoose: true,
			word: "THING",
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
			<button
				type="button"
				className="underline"
				onClick={onBack}
				data-id="button-switch-prompt"
			>
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
	let [activeListIndex, setActiveListIndex] = useState(-1);
	const [isResponse, setIsResponse] = useState(false);
	const [response, setResponse] = useState(responseLists[0]);
	const [filled, setFilled] = useState<(string[] | null)[]>([]);
	const listMap: Record<string, WordListType> = useMemo(() => {
		const listMap: Record<string, WordListType> = {};
		for (const list of project.wordLists) {
			listMap[list.name] = list;
		}
		return listMap;
	}, [project.wordLists]);

	const usedSentence = isResponse
		? `<${response}> <PLAYERGUESS>`
		: currentSentence;
	const items = useMemo(() => {
		let content = "";
		let isInList = false;
		const items: (string | [string])[] = [];
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
		return items;
	}, [usedSentence]);

	const lists = useMemo(
		() =>
			items
				.filter((a) => Array.isArray(a))
				.map((a) => {
					if (a[0] === "PLAYERGUESS") return PLAYER_GUESS;
					return listMap[a[0]];
				})
				.filter(Boolean),
		[items, listMap],
	);
	const nonOptionalListIndices = lists
		.map<[WordListType, number]>((list, i) => [list, i])
		.filter(([list]) => !list.optional)
		.map(([, index]) => index);
	const firstNonOptionalListIndices = nonOptionalListIndices.slice(0, 2);
	if (activeListIndex === -1) {
		activeListIndex = firstNonOptionalListIndices[0] ?? 0;
	}

	const { listWordMap, listKeyMapSet } = useMemo(
		() =>
			getListMaps({
				promptData: prompt,
				wordLists: project.wordLists,
				sentenceStructures: project.sentenceStructures,
			}),
		[prompt, project.wordLists, project.sentenceStructures],
	);

	let colorCount = 0;
	let listCount = 0;

	const getFiller = (index: number) => (value: string[]) => {
		setFilled(
			produce((filled) => {
				if (value.length === 0) {
					filled[index] = null;
				} else {
					filled[index] = value;
				}
			}),
		);
	};

	const selectWords = useCallback(
		(list: WordListType) => {
			const words: Set<string> = new Set(
				(listWordMap[list.name] ?? [])
					.filter((word) => word.alwaysChoose)
					.map((word) => word.word),
			);
			let remaining = 9 - words.size;
			if (remaining <= 0) remaining = 1;
			const tailored = new Set(
				prompt.tailoredWords
					.filter((w) => {
						const listName = w.list.slice(1, -1);
						return (
							listName === list.name ||
							listKeyMapSet[list.name]?.has(listName) ||
							listKeyMapSet[listName]?.has(list.name)
						);
					})
					.map((w) => w.word),
			);
			const available: string[] = (listWordMap[list.name] ?? [])
				.filter((word) => !word.alwaysChoose)
				.map((w) => w.word);
			const weights = available.map((w) => (tailored.has(w) ? 5 : 1));
			for (let i = 0; i < remaining; i++) {
				if (available.length === 0) break;
				const word = chance.weighted(available, weights);
				if (!word) break;
				if (words.has(word)) {
					i--;
					// remove the word!
					const index = available.indexOf(word);
					available.splice(index, 1);
					weights.splice(index, 1);
				}
				words.add(word);
			}
			return Array.from(words);
		},
		[listWordMap, listKeyMapSet, prompt.tailoredWords],
	);
	const listWords = useMemo(
		() => lists.map((list) => selectWords(list)),
		[lists, selectWords],
	);

	const isReadyForSubmit = nonOptionalListIndices.every(
		(index) => !!filled[index],
	);

	return (
		<div className="md:w-[40rem] md:mx-auto overflow-hidden h-full flex flex-col gap-2">
			<h3
				className="text-2xl font-black text-center"
				data-id="create-password"
				data-value={prompt.password}
			>
				describe {prompt.password}
			</h3>
			<div
				className="bg-white p-8 flex items-center content-center flex-col text-black text-3xl font-bold"
				data-id="create-sentence-container"
			>
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
								const isFilled = !!filled[listCount];
								if (list.placeholder) content = list.placeholder;
								if (isFilled) content = filled[listCount]!.join(" ");
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
								if (isFilled) color += " text-black!";
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
										data-id="sentence-text"
										data-active={activeListIndex === count}
									>
										{content}
									</button>
								);
							}
						}
						return (
							<span key={i} data-id="sentence-text">
								{item}
							</span>
						);
					})}
				</div>
			</div>
			<div className="flex gap-2 overflow-hidden h-full">
				{isResponse ? (
					<>
						<WordSelectionList
							list={listMap[response]}
							color="pink"
							onSelect={getFiller(0)}
							selected={filled[0] ?? []}
							words={listWords[0]}
						/>
						<WordSelectionList
							list={PLAYER_GUESS}
							color="orange"
							onSelect={getFiller(1)}
							words={PLAYER_GUESS.words.map((w) => w.word)}
							selected={listWords[1] ?? []}
						/>
					</>
				) : firstNonOptionalListIndices.includes(activeListIndex) ? (
					firstNonOptionalListIndices.map((listIndex, i) => (
						<WordSelectionList
							key={`${activeStructureIndex}-${listIndex}`}
							list={lists[listIndex]}
							color={i ? "orange" : "pink"}
							selected={filled[listIndex] ?? []}
							onSelect={getFiller(listIndex)}
							words={listWords[listIndex]}
						/>
					))
				) : (
					<WordSelectionList
						key={`${activeStructureIndex}-${lists[activeListIndex]}`}
						list={lists[activeListIndex]}
						color={lists[activeListIndex].optional ? "" : "blue"}
						onSelect={getFiller(activeListIndex)}
						selected={filled[activeListIndex] ?? []}
						words={listWords[activeListIndex]}
					/>
				)}
			</div>
			<div className="text-center">
				<button
					className="text-3xl font-semibold uppercase p-4 w-full bg-emerald-600 rounded-lg"
					type="button"
					onClick={() => {
						if (isReadyForSubmit && !isResponse) {
							let newIndex = activeStructureIndex + 1;
							if (structure.structures.length === activeStructureIndex + 1) {
								newIndex = 0;
							}
							setActiveStructureIndex(newIndex);
							setCurrentSentence(structure.structures[newIndex]);
						} else {
							setIsResponse(!isResponse);
							if (!isResponse) {
								setResponse(toShuffled(responseLists)[0]);
							}
						}
						setFilled([]);
						setActiveListIndex(-1);
					}}
					data-id="button-create-submit"
					data-ready={isReadyForSubmit}
				>
					{isReadyForSubmit ? "submit" : "skip"}
				</button>
			</div>
		</div>
	);
}

type ColorStrings = "" | "pink" | "orange" | "blue";

function WordSelectionList({
	list,
	color = "",
	onSelect,
	selected,
	words,
}: {
	list: WordListType;
	color?: ColorStrings;
	onSelect?: (selected: string[]) => void;
	selected: string[];
	words: string[];
}) {
	if (!list) return;
	const colors: Record<ColorStrings, [string, string]> = {
		pink: ["border-pink-400", "bg-pink-400"],
		orange: ["border-orange-400", "bg-orange-400"],
		blue: ["border-blue-400", "bg-blue-400"],
		"": ["border-gray-400", "bg-gray-400"],
	};
	const disabled = !!list.maxChoices && selected.length >= +list.maxChoices;

	return (
		<div
			className="flex-1 flex justify-center overflow-auto items-start"
			data-id="create-selection-list"
		>
			<div className={"grid grid-cols-1 flex-1 max-w-[20rem]"}>
				{words.map((word) => (
					<WordSelectionListButton
						key={word}
						color={colors[color]}
						word={word}
						initialToggle={selected.includes(word)}
						onToggle={(state) => {
							const newValue = produce((selection) => {
								if (state) {
									selection.push(word);
								} else {
									// deletion
									selection.splice(selection.indexOf(word), 1);
								}
							})(selected);
							onSelect?.(newValue);
						}}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
}

function WordSelectionListButton({
	color,
	word,
	onToggle,
	disabled,
	initialToggle,
}: {
	color: [string, string];
	word: string;
	onToggle?: (newState: boolean) => void;
	disabled: boolean;
	initialToggle: boolean;
}) {
	const [isSelected, setIsSelected] = useState(initialToggle);
	return (
		<div
			className="relative first:[&.div]:border-t-6 last:[&.div]:border-b-6"
			data-id="selection-list-item"
			data-selected={isSelected}
		>
			{isSelected && (
				<span className="absolute left-[0.5rem] top-[0.5rem] w-6 h-6 text-center bg-black text-white rounded-full pointer-events-none z-10">
					x
				</span>
			)}
			<div
				className={`uppercase ${disabled ? "opacity-70" : ""} font-semibold text-lg border-x-6 border-y-3 p-1 ${isSelected ? "text-black" : ""}  ${isSelected ? color[1] : "bg-black"} ${color[0]}`}
			>
				<button
					type="button"
					className="uppercase w-full"
					onClick={() => {
						if (disabled && !isSelected) return;
						setIsSelected(!isSelected);
						onToggle?.(!isSelected);
					}}
					data-id="selection-list-word"
				>
					{word}
				</button>
			</div>
		</div>
	);
}
