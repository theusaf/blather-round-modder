import type { PromptType } from "@/lib/types/blather";
import { similarity } from "@/lib/util/similarity";

/**
 * Checks if a prompt matches a search string.
 *
 * @param prompt The prompt to filter
 * @param search The search string
 * @returns Whether the prompt matches the search
 */
export function filterPrompt(prompt: PromptType, search: string): boolean {
	const compareValue = 0.8;
	return (
		prompt.password.toLowerCase().includes(search.toLowerCase()) ||
		prompt.alternateSpellings.some((word) =>
			word.toLowerCase().includes(search.toLowerCase()),
		) ||
		prompt.subcategory.toLowerCase().includes(search.toLowerCase()) ||
		similarity(prompt.subcategory, search) >= compareValue ||
		similarity(prompt.password, search) >= compareValue ||
		prompt.alternateSpellings.some(
			(word) => similarity(word, search) >= compareValue,
		)
	);
}
