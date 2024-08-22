"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType, WordListType } from "@/lib/types/blather";
import {
	faCircleExclamation,
	faCircleRight,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import { useMemo } from "react";
import { Modal } from "../../_util/modal";
import { newBlankWordList } from "../../_util/newItems";

interface BaseValidation {
	message: string;
	type: "prompt" | "wordList" | "sentenceStructure";
	severity: "error" | "warning";
}

/**
 * Validation for a prompt.
 */
interface PromptValidation extends BaseValidation {
	type: "prompt";
	/**
	 * The prompt data to open or create.
	 */
	data: PromptType;
}

/**
 * Validation for a word list.
 */
interface WordListValidation extends BaseValidation {
	type: "wordList";
	/**
	 * The word list data to open or create.
	 */
	data?: WordListType;
}

type Validation = PromptValidation | WordListValidation | BaseValidation;

export default function ValidationSection({
	setModal,
	setTab,
}: {
	setModal: (data: PromptType | WordListType, type: Modal) => void;
	setTab: (tab: string) => void;
}) {
	const now = Date.now();
	console.log("Start");

	// TODO: If this method becomes too expensive, look for ways to improve performance or add loading spinner while calculating async.
	const prompts = useProjectStore((state) => state.prompts);
	const wordLists = useProjectStore((state) => state.wordLists);
	const sentenceStructures = useProjectStore(
		(state) => state.sentenceStructures,
	);

	const validations: Validation[] = [];

	// setup data structures for validation
	const listMap = useMemo(() => {
		const map: Record<string, WordListType> = {};
		for (const wordList of wordLists) {
			map[wordList.name] = wordList;
		}
		return map;
	}, [wordLists]);

	const categories = useMemo(() => {
		const list: Set<string> = new Set();
		for (const prompt of prompts) {
			list.add(prompt.category);
		}
		return Array.from(list);
	}, [prompts]);
	const subcategories = useMemo(() => {
		const map: Record<string, Set<string>> = {};
		for (const prompt of prompts) {
			const category = prompt.category;
			if (prompt.subcategory) {
				if (!map[category]) {
					map[category] = new Set();
				}
				map[category].add(prompt.subcategory);
			}
		}
		return map;
	}, [prompts]);

	// validate content
	// sentence structure validation
	for (const category of categories) {
		let exists = false;
		for (const structure of sentenceStructures) {
			if (structure.category === category) {
				exists = true;
				break;
			}
		}
		if (!exists) {
			validations.push({
				type: "sentenceStructure",
				severity: "error",
				message: `Missing sentence structure for "${category}"`,
			});
		}
	}
	// missing response sentence
	let responseSentenceExists = false;
	for (const structure of sentenceStructures) {
		if (structure.category === "response") {
			responseSentenceExists = true;
			break;
		}
	}
	if (!responseSentenceExists) {
		validations.push({
			type: "sentenceStructure",
			severity: "error",
			message: `Missing sentence structure for "response"`,
		});
	}
	// using lists which don't exist
	for (const structure of sentenceStructures) {
		for (const phrase of structure.structures) {
			const lists = (phrase.match(/<([^>]+)>/g) ?? []).map((match) =>
				match.slice(1, -1),
			);
			const missingLists = lists.filter(
				(list) => !listMap[list] && list !== "PLAYERGUESS",
			);
			if (missingLists.length > 0) {
				validations.push({
					type: "sentenceStructure",
					severity: "error",
					message: `"${structure.category}" structure is using missing word lists: ${missingLists.join(", ")}`,
				});
			}
		}
	}

	// word list validation
	// missing response sentence lists
	if (!listMap["response-sentence"]) {
		validations.push({
			type: "wordList",
			severity: "error",
			message: 'Missing "response-sentence" word list',
			data: produce(newBlankWordList, (draft) => {
				draft.name = "response-sentence";
			}),
		});
	}
	for (const category of categories) {
		if (!listMap[`response-sentence-${category}`]) {
			validations.push({
				type: "wordList",
				severity: "error",
				message: `Missing "response-sentence-${category}" word list`,
				data: produce(newBlankWordList, (draft) => {
					draft.name = `response-sentence-${category}`;
				}),
			});
		}
		if (subcategories[category]) {
			const items = Array.from(subcategories[category]);
			for (const subcategory of items) {
				if (!listMap[`response-sentence-${category}-${subcategory}`]) {
					validations.push({
						type: "wordList",
						severity: "error",
						message: `Missing "response-sentence-${category}-${subcategory}" word list`,
						data: produce(newBlankWordList, (draft) => {
							draft.name = `response-sentence-${category}-${subcategory}`;
						}),
					});
				}
			}
		}
	}
	// references a non-existent word list
	for (const list of wordLists) {
		const missingLists = list.words.filter((word) => {
			if (/^<[^>]+>$/.test(word.word)) {
				return !listMap[word.word.slice(1, -1)];
			}
			return false;
		});
		if (missingLists.length > 0) {
			validations.push({
				type: "wordList",
				severity: "error",
				message: `Word list "${list.name}" references missing word lists: ${missingLists.map((word) => word.word).join(", ")}`,
				data: list,
			});
		}
	}
	// unused top-level lists
	const sublists = new Set<string>();
	for (const list of wordLists) {
		for (const word of list.words) {
			if (/^<[^>]+>$/.test(word.word)) {
				sublists.add(word.word.slice(1, -1));
			}
		}
	}
	const topLevelLists = new Set<string>();
	for (const prompt of prompts) {
		for (const word of prompt.tailoredWords) {
			if (/^<[^>]+>$/.test(word.list)) {
				topLevelLists.add(word.list.slice(1, -1));
			}
		}
	}
	for (const structure of sentenceStructures) {
		for (const phrase of structure.structures) {
			const lists = (phrase.match(/<([^>]+)>/g) ?? []).map((match) =>
				match.slice(1, -1),
			);
			for (const list of lists) {
				topLevelLists.add(list);
			}
		}
	}
	for (const list of wordLists) {
		if (
			!sublists.has(list.name) &&
			!topLevelLists.has(list.name) &&
			!list.name.startsWith("response-sentence")
		) {
			validations.push({
				type: "wordList",
				severity: "warning",
				message: `Word list "${list.name}" is not used`,
			});
		}
	}

	// prompt validation
	// lacking tailored words
	for (const prompt of prompts) {
		if (prompt.tailoredWords.length === 0) {
			validations.push({
				type: "prompt",
				severity: "warning",
				message: `Prompt "${prompt.category}/${prompt.password}" does not have tailored words`,
				data: prompt,
			});
		}
	}

	console.log(`End: ${Date.now() - now}ms`);

	let promptCount = 0;
	let wordListCount = 0;
	let sentenceStructureCount = 0;

	return (
		<div>
			<h3 className="text-lg font-semibold">Validation</h3>
			<div className="grid grid-flow-row gap-2">
				{validations.map((validation) => {
					let key = "";
					switch (validation.type) {
						case "prompt":
							key = `prompt-${promptCount}`;
							promptCount++;
							break;
						case "wordList":
							key = `wordList-${wordListCount}`;
							wordListCount++;
							break;
						case "sentenceStructure":
							key = `sentenceStructure-${sentenceStructureCount}`;
							sentenceStructureCount++;
							break;
					}
					return (
						<div
							key={key}
							className={`flex gap-2 items-center p-2 rounded-md bg-slate-300 min-w-0 shadow-sm justify-between ${
								validation.severity === "error"
									? "shadow-red-300"
									: "shadow-yellow-300"
							}`}
						>
							<div className="flex-shrink min-w-0 flex gap-2 items-center">
								<FontAwesomeIcon
									icon={
										validation.severity === "error"
											? faCircleExclamation
											: faTriangleExclamation
									}
									className={
										validation.severity === "error"
											? "text-red-500"
											: "text-yellow-500"
									}
								/>
								<span className="truncate">{validation.message}</span>
							</div>
							<button
								type="button"
								onClick={() => {
									switch (validation.type) {
										case "sentenceStructure": {
											setTab("sentenceStructures");
											break;
										}
										case "wordList": {
											if ((validation as WordListValidation).data) {
												setModal(
													(validation as WordListValidation).data!,
													Modal.WordList,
												);
											} else {
												setTab("wordLists");
											}
											break;
										}
										case "prompt": {
											setModal(
												(validation as PromptValidation).data,
												Modal.Prompt,
											);
											break;
										}
									}
								}}
							>
								<FontAwesomeIcon icon={faCircleRight} />
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
