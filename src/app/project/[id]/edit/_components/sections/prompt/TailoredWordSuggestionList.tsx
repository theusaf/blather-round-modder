"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType, WordListType } from "@/lib/types/blather";
import { getListMaps } from "@/lib/util/list";
import { useMemo } from "react";

export function TailoredWordSuggestionList({
	promptData,
	onSelect,
}: { promptData: PromptType; onSelect?: (list: string) => void }) {
	const sentenceStructures = useProjectStore(
		(state) => state.sentenceStructures,
	);
	const wordLists = useProjectStore((state) => state.wordLists);
	const { tailoredWords } = promptData;
	const listMap: Record<string, WordListType> = {};
	for (const wordList of wordLists) {
		listMap[wordList.name] = wordList;
	}

	const { topLevelListKeys, subLevelListKeys, listKeyMapSet } = useMemo(() => {
		const { topLevelListKeys, subLevelListKeys, listKeyMapSet } = getListMaps({
			promptData,
			wordLists,
			sentenceStructures,
		});
		const inverseListKeyMapSet: Record<string, Set<string>> = {};
		for (const key in listKeyMapSet) {
			for (const subKey of listKeyMapSet[key]) {
				if (!inverseListKeyMapSet[subKey])
					inverseListKeyMapSet[subKey] = new Set();
				inverseListKeyMapSet[subKey].add(key);
			}
		}
		return {
			topLevelListKeys,
			subLevelListKeys,
			listKeyMapSet: inverseListKeyMapSet,
		};
	}, [promptData, wordLists, sentenceStructures]);

	const usedLists = new Set<string>();
	for (const word of tailoredWords) {
		usedLists.add(word.list.slice(1, -1));
	}

	const topLevelMissing: string[] = [];
	const subLevelMissing: string[] = [];
	const checkMissing = (
		input: Iterable<string>,
		output: string[],
		ignore: Set<string> = new Set(),
	) => {
		for (const key of input) {
			if (ignore.has(key)) continue;
			let missing = !usedLists.has(key);
			if (!missing) {
				for (const subKey of listKeyMapSet[key] ?? []) {
					if (usedLists.has(subKey)) {
						missing = false;
						break;
					}
				}
				for (const subKey of listKeyMapSet[key] ?? []) {
					usedLists.add(subKey);
				}
			}
			if (missing) output.push(key);
		}
	};
	checkMissing(subLevelListKeys, subLevelMissing);
	checkMissing(topLevelListKeys, topLevelMissing, subLevelListKeys);

	return (
		<div className="border-r-2 border-slate-600 mt-2 p-2 flex-1">
			<h4 className="font-semibold text-lg">Suggestions</h4>
			<div>
				{topLevelMissing.length === 0 ? (
					<span>No suggestions available.</span>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
						{[...topLevelMissing.toSorted(), ...subLevelMissing.toSorted()].map(
							(key) => (
								<button
									key={key}
									type="button"
									className="bg-blue-400 text-white rounded-md truncate p-1"
									title={key}
									onClick={() => onSelect?.(key)}
								>
									{key}
								</button>
							),
						)}
					</div>
				)}
			</div>
		</div>
	);
}
