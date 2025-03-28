import type {
	PromptType,
	SentenceStructureType,
	WordListType,
	WordListWordType,
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
	const listWordMap: Record<string, WordListWordType[]> = {};
	for (const wordList of wordLists) {
		listMap[wordList.name] = wordList;
	}
	// add words from tailored words
	for (const word of tailoredWords) {
		const list = listMap[word.list.slice(1, -1)];
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
	const listMapSet: Record<string, Set<string>> = {};
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
	for (const topList of topLevelLists) {
		listMapSet[topList] = new Set(
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
			Array.from(listMapSet[key] ?? []),
		),
	);
	for (const list of subLevelListKeys) {
		listMapSet[list] = new Set(recursiveAddList(list, new Set([list])));
	}

	const recursiveAddWord = (
		listName: string,
		discoveredLists = new Set<string>(),
	) => {
		const strings: WordListWordType[] = [];
		const list = listMap[listName];
		if (!list) return [];
		const lists = [];
		for (const word of list.words) {
			if (/^<[^>]+>$/.test(word.word)) {
				lists.push(word.word.slice(1, -1));
			} else {
				strings.push(word);
			}
		}
		if (lists.length === 0) return strings;
		for (const sublist of lists) {
			if (discoveredLists.has(sublist)) continue; // prevent infinite recursion
			discoveredLists.add(sublist);
			strings.push(...recursiveAddWord(sublist, discoveredLists));
		}
		return strings;
	};
	for (const key in listMap) {
		listWordMap[key] = recursiveAddWord(key);
	}
	return {
		topLevelListKeys,
		subLevelListKeys,
		listKeyMap: listMap,
		listKeyMapSet: listMapSet,
		listWordMap,
	};
}
