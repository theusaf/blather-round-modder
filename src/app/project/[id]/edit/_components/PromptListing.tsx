"use client";
import { CategoryLabel } from "@/lib/components/CategoryLabel";
import { DifficultyLabel } from "@/lib/components/DifficultyLabel";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType } from "@/lib/types/blather";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";

export function PromptListing({
	prompts,
	setModal,
}: {
	setModal: (prompt: PromptType) => void;
	prompts: PromptType[];
}) {
	const allPrompts = useProjectStore((state) => state.prompts);
	const setPrompts = useProjectStore((state) => state.setPrompts);

	return (
		<div className="gap-2 grid md:grid-cols-3 lg:grid-cols-4">
			{prompts.map((prompt, index) => (
				<SectionCard key={index} className="flex gap-2 w-full justify-between">
					<div className="flex flex-col gap-2 flex-shrink min-w-0">
						<div className="flex gap-2 overflow-x-hidden">
							<CategoryLabel category={prompt.category} />
							<DifficultyLabel difficulty={prompt.difficulty} />
						</div>
						<div className="font-semibold whitespace-nowrap max-w-48 truncate">
							{prompt.password}
						</div>
					</div>
					<div className="flex gap-2">
						<button
							type="button"
							className="flex items-center"
							onClick={() => {
								setModal(prompt);
							}}
						>
							<FontAwesomeIcon
								className="w-6 h-6 rounded-md text-white bg-emerald-700 p-2"
								icon={faPenToSquare}
							/>
						</button>
						<button
							type="button"
							className="flex items-center"
							onClick={() => {
								setPrompts(
									produce(allPrompts, (draft) => {
										const index = allPrompts.findIndex(
											(p) => p.id === prompt.id,
										);
										if (index === -1) return;
										draft.splice(index, 1);
									}),
								);
							}}
						>
							<FontAwesomeIcon
								className="w-6 h-6  rounded-md text-white bg-red-600 p-2"
								icon={faTrash}
							/>
						</button>
					</div>
				</SectionCard>
			))}
		</div>
	);
}
