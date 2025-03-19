"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType, WordListType } from "@/lib/types/blather";
import { useMemo } from "react";

export function TailoredWordSuggestionList({
	promptData,
	onSelect,
}: { promptData: PromptType; onSelect?: (list: string) => void }) {
	const sentenceStructures = useProjectStore(
		(state) => state.sentenceStructures,
	);
	const wordLists = useProjectStore((state) => state.wordLists);

	// TODO: refactor duplicate code from validation
	const { subcategory, category, tailoredWords } = promptData;
	const listMap: Record<string, WordListType> = {};
	for (const wordList of wordLists) {
		listMap[wordList.name] = wordList;
	}

	const topLevelList = useMemo(() => {
		const topLevelLists = new Set<string>();
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
		const topLevelListMap: Record<string, Set<string>> = {};
		const recursiveAddList = (listName: string, listsFound: Set<string>) => {
			const list = listMap[listName];
			if (!list) return [];
			const lists = [];
			for (const word of list.words) {
				if (/^<[^>]+>$/.test(word.word)) {
					lists.push(word.word.slice(1, -1));
				}
			}
			if (lists.length === 0) return [];
			const result: string[] = [];
			for (const sublist of lists) {
				if (listsFound.has(sublist)) continue; // prevent infinite recursion
				result.push(sublist);
				listsFound.add(sublist);
				result.push(...recursiveAddList(sublist, listsFound));
			}
			return result;
		};
		for (const topList of Array.from(topLevelLists)) {
			topLevelListMap[topList] = new Set(
				recursiveAddList(topList, new Set([topList])),
			);
		}

		const relevantStructure = sentenceStructures.find(
			(structure) => structure.category === category,
		);
		const topLevelListKeys = new Set([
			`response-sentence-${category}`,
			"response-sentence",
		]);
		if (subcategory) {
			topLevelListKeys.add(`response-sentence-${category}-${subcategory}`);
		}
		if (relevantStructure) {
			for (const phrase of relevantStructure.structures) {
				const lists = (phrase.match(/<([^>]+)>/g) ?? []).map((match) =>
					match.slice(1, -1),
				);
				for (const list of lists) topLevelListKeys.add(list);
			}
		}
		const combinedTopLevelLists = new Set([
			...Array.from(topLevelListKeys).flatMap((key) =>
				Array.from(topLevelListMap[key] ?? []),
			),
			...Array.from(topLevelListKeys),
		]);
		return combinedTopLevelLists;
	}, [subcategory, category, sentenceStructures]);

	const usedLists = new Set<string>();
	for (const word of tailoredWords) {
		usedLists.add(word.list.slice(1, -1));
	}

	const topLevelMissing: string[] = [];
	for (const key of topLevelList) {
		if (!usedLists.has(key)) topLevelMissing.push(key);
	}

	return (
		<div className="border-r-2 border-slate-600 mt-2 p-2">
			<h4 className="font-semibold text-lg">Suggestions</h4>
			<div>
				{topLevelMissing.length === 0 ? (
					<span>No suggestions available.</span>
				) : (
					<div className="grid grid-cols-3 gap-2">
						{[...topLevelMissing].toSorted().map((key) => (
							<button
								key={key}
								type="button"
								className="bg-blue-400 text-white rounded-md truncate p-1"
								title={key}
								onClick={() => onSelect?.(key)}
							>
								{key}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
