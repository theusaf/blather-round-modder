import type {
	PromptType,
	SentenceStructureType,
	WordListType,
} from "../types/blather";

export function getListMaps({
	promptData,
	wordLists: inputWordLists,
	sentenceStructures,
}: {
	promptData: PromptType;
	wordLists: Iterable<WordListType>;
	sentenceStructures: SentenceStructureType[];
}) {
	const { subcategory, category, tailoredWords } = promptData;
	const wordLists = structuredClone(inputWordLists);
	const listMap: Record<string, WordListType> = {};
	const listWordMap: Record<string, WordListType["words"]> = {};
	for (const wordList of wordLists) {
		listMap[wordList.name] = wordList;
	}
	// add words from tailored words
	for (const word of tailoredWords) {
		const list = listMap[word.list];
		if (list) {
			list.words.push({ word: word.word, alwaysChoose: false });
		}
	}

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
		"response-sentence-clue",
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
	const subLevelListKeys = new Set(
		Array.from(topLevelListKeys).flatMap((key) =>
			Array.from(topLevelListMap[key] ?? []),
		),
	);

	// TODO: this doesn't work. might need to be recursive.
	for (const key in listMap) {
		const strings = [];
		for (const word of listMap[key].words) {
			if (word.word.startsWith("<") && word.word.endsWith(">")) {
				const list = word.word.slice(1, -1);
				const listRelatives = topLevelListMap[list];
				if (!listRelatives) continue;
				for (const relative of listRelatives) {
					const relativeWords = listMap[relative]?.words;
					if (!relativeWords) continue;
					strings.push(
						...relativeWords.filter(
							(a) => !(a.word.startsWith("<") && a.word.endsWith(">")),
						),
					);
				}
			} else {
				strings.push(word);
			}
		}
		listWordMap[key] = strings;
	}
	return {
		topLevelListKeys,
		subLevelListKeys,
		listKeyMap: listMap,
		listWordMap,
	};
}
