import type { WordListType } from "@/lib/types/blather";

/**
 * Checks if a word list matches a search string.
 *
 * @param list The list to filter
 * @param search The search string
 * @returns Whether the list matches the search
 */
export function filterWordList(list: WordListType, search: string): boolean {
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
