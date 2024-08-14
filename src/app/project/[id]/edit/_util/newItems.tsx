import type { PromptType, WordListType } from "@/lib/types/blather";

export const newPromptData: PromptType = {
	category: "thing",
	subcategory: "",
	difficulty: "easy",
	password: "",
	id: "000",
	us: false,
	alternateSpellings: [],
	forbiddenWords: [],
	tailoredWords: [],
};

export const newBlankWordList: WordListType = {
	amount: "",
	id: "000",
	maxChoices: "",
	name: "",
	optional: false,
	placeholder: "",
	words: [],
};

export function getNewResponseList(wordList: WordListType | undefined | null): WordListType {
	const responsePhrases =
		wordList?.words.map((word) => {
			return {
				...word,
				alwaysChoose: true,
			};
		}) ??
		[
			"It's a lot like",
			"It's kinda similar to",
			"It's nothing like",
			"It has the same vibe as",
			"It's a different genre than",
			"It's not the same form as",
		].map((word) => {
			return {
				alwaysChoose: true,
				word,
			};
		});
	return {
		amount: "",
		id: "000",
		maxChoices: "1",
		name: "response-sentence-EDITME",
		optional: false,
		placeholder: "It's a lot like",
		words: responsePhrases,
	};
}
