export type NumberedString = `${number}`;
export type OptionalNumberedString = `${number}` | "";
export type ListString = `<${string}>`;

export type Category = "thing" | "person" | "place" | "story";
export type Difficulty = "easy" | "medium" | "hard";

/**
 * A list of words that can be used to fill in a blank in a clue phrase.
 */
export interface WordListType {
	/**
	 * TODO: Determine what this does. Current assumption: maximum times per round this word list can be used.
	 */
	amount: OptionalNumberedString;
	/**
	 * The ID of the word list.
	 */
	id: NumberedString;
	/**
	 * The maximum number of words to choose from the list.
	 */
	maxChoices: OptionalNumberedString;
	/**
	 * The name of the word list.
	 */
	name: string;
	/**
	 * Whether or not this word list is optional. TODO: Determine what this does.
	 */
	optional: boolean;
	/**
	 * Placeholder text for the list. The text that is displayed if no words are chosen.
	 */
	placeholder: string;
	/**
	 * The words in the list. Can link to other lists.
	 */
	words: {
		/**
		 * TODO: Determine what `alwaysChoose` does and how linked lists work.
		 */
		alwaysChoose: boolean;
		/**
		 * The word or list name.
		 */
		word: string | ListString;
	}[];
}

/**
 * A sentence structure that can be used for multiple prompts in a row.
 */
export interface SentenceStructureType {
	/**
	 * The category for the sentence structure.
	 */
	category: Category | "response";
	/**
	 * The ID of the sentence structure.
	 */
	id: NumberedString;
	/**
	 * The template for the sentence structure.
	 *
	 * Ex: `The <thing> was <adjective>.`
	 */
	structures: string[];
}

/**
 * A prompt that players need to describe.
 */
export interface PromptType {
	/**
	 * Alternate spellings of the prompt.
	 * Useful for thing like "The Beatles" / "Beatles".
	 */
	alternateSpellings: string[];
	/**
	 * The category of the prompt.
	 */
	category: Category;
	/**
	 * The difficulty of the prompt.
	 */
	difficulty: Difficulty;
	/**
	 * Words that cannot be used in the prompt.
	 *
	 * Can be used to prevent certain words from being used
	 * * Example for a password 'The White House', the word 'white' could be forbidden.
	 * * Does not affect alternate spellings. (Things like 'Car' will still be valid for 'Kart')
	 */
	forbiddenWords: string[];
	/**
	 * The ID of the prompt.
	 */
	id: NumberedString;
	/**
	 * The prompt word.
	 */
	password: string;
	/**
	 * The subcategory of the prompt.
	 *
	 * Affects usage of response lists (for example, `response-sentence-<category>-<subcategory>`)
	 */
	subcategory: string;
	/**
	 * A list of related words that may be helpful for the prompt.
	 */
	tailoredWords: {
		/**
		 * The list to add the word to.
		 *
		 * This can be used to make certain words more likely
		 * or add new words to the list.
		 */
		list: ListString;
		/**
		 * The word.
		 */
		word: string;
	}[];
	/**
	 * Whether or not the prompt is a US-centric prompt.
	 *
	 * Used for the US-centric filter setting.
	 * * Example: "The White House" is a US-centric prompt.
	 */
	us: boolean;
}

export interface FieldType {
	t: "S" | "B";
	v: string;
	n: string;
}

export interface JackboxJETContent<E> {
	content: E[];
}

export interface JackboxJETFields<E> {
	fields: E[];
}
