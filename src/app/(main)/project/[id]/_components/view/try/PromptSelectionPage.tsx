"use client";
import type { PromptType } from "@/lib/types/blather";
import type { ProjectType } from "@/lib/types/project";
import { toShuffled } from "@/lib/util/shuffle";
import { useContext, useState } from "react";
import { ProjectContext } from "../ProjectContext";
import { PromptChoiceBlock } from "./PromptChoiceBlock";

export function PromptSelectionPage({
	onPromptSelect,
}: { onPromptSelect: (prompt: PromptType) => void }) {
	const project = useContext(ProjectContext);
	if (!project) return;
	return (
		<PromptSelectionPageContent
			onPromptSelect={onPromptSelect}
			project={project}
		/>
	);
}

function PromptSelectionPageContent({
	project,
	onPromptSelect,
}: { project: ProjectType; onPromptSelect: (prompt: PromptType) => void }) {
	const { prompts } = project;
	const [easy, setEasy] = useState(
		toShuffled(prompts.filter((p) => p.difficulty === "easy")),
	);
	const [medium, setMedium] = useState(
		toShuffled(prompts.filter((p) => p.difficulty === "medium")),
	);
	const [hard, setHard] = useState(
		toShuffled(prompts.filter((p) => p.difficulty === "hard")),
	);

	return (
		<div className="bg-emerald-700 p-2 h-full flex flex-col gap-2 uppercase">
			<h3 className="text-2xl font-black text-center">
				Choose Your Secret Prompt
			</h3>
			<h4 className="text-lg font-medium text-center">
				easy prompts are worth less
			</h4>
			<div
				className="flex-1 flex-col h-full max-w-[25rem] m-auto"
				data-id="try-prompt-selection"
			>
				<div className="p-2 flex flex-col items-center gap-4">
					<div className="flex gap-6 text-center flex-col">
						<PromptChoiceBlock
							prompt={easy[0]}
							onClick={() => onPromptSelect(easy[0])}
						/>
						<PromptChoiceBlock
							prompt={medium[0]}
							onClick={() => onPromptSelect(medium[0])}
						/>
						<PromptChoiceBlock
							prompt={hard[0]}
							onClick={() => onPromptSelect(hard[0])}
						/>
					</div>
					<button
						type="button"
						className="bg-slate-700 p-4 text-xl rounded-lg max-w-40 uppercase"
						onClick={() => {
							setEasy(toShuffled(easy));
							setMedium(toShuffled(medium));
							setHard(toShuffled(hard));
						}}
					>
						get 3 new prompts
					</button>
				</div>
			</div>
		</div>
	);
}
