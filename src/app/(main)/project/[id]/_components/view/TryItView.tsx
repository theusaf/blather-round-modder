"use client";

import { Neucha } from "next/font/google";
import { useContext, useState } from "react";
import { ProjectContext } from "./ProjectContext";
import { toShuffled } from "@/lib/util/shuffle";
import type { Category, PromptType } from "@/lib/types/blather";

const blockyFont = Neucha({ subsets: ["latin"], weight: "400" });

export function TryItView() {
	return (
		<div className="md:col-span-2 h-[40rem] bg-slate-700 p-2 text-white flex flex-col">
			<h4 className="font-bold text-lg">Try It</h4>
			<div className={`flex-1 ${blockyFont.className}`}>
				<PromptSelectionPage />
			</div>
		</div>
	);
}

function PromptSelectionPage() {
	const project = useContext(ProjectContext);
	if (!project) return;
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
			<div className="flex-1 flex-col h-full max-w-[30rem] m-auto">
				<div className="p-2 flex flex-col items-center gap-4">
					<div className="flex gap-6 text-center flex-col">
						<PromptChoiceBlock prompt={easy[0]} />
						<PromptChoiceBlock prompt={medium[0]} />
						<PromptChoiceBlock prompt={hard[0]} />
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

function PromptChoiceBlock({ prompt }: { prompt?: PromptType }) {
	if (!prompt) return;
	const colors: Record<Category, string> = {
		story: "bg-blue-400",
		person: "bg-pink-400",
		thing: "bg-orange-400",
		place: "bg-green-400",
	};
	return (
		<div className="w-[20rem]">
			<div className="bg-black text-2xl relative">
				<div className="absolute left-[-2rem] top-[-0.5rem]">
					<div
						className={`${colors[prompt.category] ?? "bg-orange-400"} text-sm p-1 w-16`}
						style={{
							transform: "rotate(-10deg)",
						}}
					>
						{prompt.category}
					</div>
				</div>
				{prompt.difficulty === "easy" && (
					<div className="overflow-hidden absolute w-full h-full">
						<span className="bg-green-500 absolute top-[0.5rem] right-[-3rem] text-sm rotate-45 text-black w-32">
							EASY
						</span>
					</div>
				)}
				<div className="p-2 px-16">
					<span>{prompt.password}</span>
				</div>
			</div>
		</div>
	);
}
