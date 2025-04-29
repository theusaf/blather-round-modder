"use client";
import SectionCard from "@/lib/components/SectionCard";
import { WordListTile } from "@/lib/components/WordListTile";
import type { PromptType } from "@/lib/types/blather";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";

export function TailoredWordTileList({
	promptData,
	setPromptData,
}: { promptData: PromptType; setPromptData: (data: PromptType) => void }) {
	return (
		<div
			className="grid md:grid-cols-3 auto-rows-max gap-2 mt-2 flex-2"
			data-id="modal-tailored-item-container"
		>
			{promptData.tailoredWords.map((word, index) => (
				<SectionCard
					key={index}
					className="overflow-hidden"
					data-id="tailored-item"
				>
					<div className="flex gap-2 items-center justify-between">
						<div className="flex gap-2 items-center min-w-0">
							<WordListTile
								onClose={(list) => {
									if (!list) return;
									setPromptData(
										produce(promptData, (draft) => {
											draft.tailoredWords[index].list = `<${list}>`;
										}),
									);
								}}
								list={word.list.slice(1, -1)}
							/>
							<span className="truncate" title={word.word}>
								{word.word}
							</span>
						</div>
						<button
							type="button"
							className="flex items-center h-min"
							onClick={() => {
								setPromptData(
									produce(promptData, (draft) => {
										draft.tailoredWords.splice(index, 1);
									}),
								);
							}}
						>
							<FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
						</button>
					</div>
				</SectionCard>
			))}
		</div>
	);
}
