"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType } from "@/lib/types/blather";

export function TailoredWordSuggestionList({
	promptData,
	onSelect,
}: { promptData: PromptType; onSelect?: (list: string) => void }) {
	const sentenceStructures = useProjectStore(
		(state) => state.sentenceStructures,
	);
	const wordLists = useProjectStore((state) => state.wordLists);

	return (
		<div className="border-r-2 border-slate-600 mt-2">
			<h4 className="font-semibold text-lg">Suggestions</h4>
		</div>
	);
}
