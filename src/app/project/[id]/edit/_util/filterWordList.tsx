import type { WordListType } from "@/lib/types/blather";

export function filterWordList(list: WordListType, search: string) {
	const lowerListName = list.name.toLowerCase();
	const lowerListNameWithSpaces = lowerListName.replace(/-/g, " ");
	const lowerSearch = search.toLowerCase();
	return (
		lowerListName.includes(lowerSearch) ||
		lowerListNameWithSpaces.includes(lowerSearch) ||
		list.words.some((word) => {
			return word.word.toLowerCase().includes(lowerSearch);
		})
	);
}
