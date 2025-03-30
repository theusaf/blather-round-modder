import type { PromptType } from "@/lib/types/blather";
import { produce } from "immer";
import { useState } from "react";
import { TailoredWordEditSection } from "../../TailoredWordEditSection";
import { TailoredWordSuggestionList } from "./TailoredWordSuggestionList";
import { TailoredWordTileList } from "./TailoredWordTileList";

export function TailoredWordSection({
	setPromptData,
	promptData,
}: { setPromptData: (data: PromptType) => void; promptData: PromptType }) {
	const [list, setList] = useState("");
	return (
		<>
			<TailoredWordEditSection
				list={list}
				setList={setList}
				onSubmit={(word, list) => {
					setPromptData(
						produce(promptData, (draft) => {
							draft.tailoredWords.push({ word, list: `<${list}>` });
						}),
					);
				}}
			/>
			<div className="flex flex-col-reverse md:flex-row gap-2 overflow-hidden">
				<TailoredWordSuggestionList
					promptData={promptData}
					onSelect={setList}
				/>
				<TailoredWordTileList
					promptData={promptData}
					setPromptData={setPromptData}
				/>
			</div>
		</>
	);
}
