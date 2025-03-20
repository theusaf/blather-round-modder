"use client";
import type { PromptType, Category } from "@/lib/types/blather";

export function PromptChoiceBlock({
	prompt,
	onClick,
}: { prompt?: PromptType; onClick: () => void }) {
	if (!prompt) return;
	const colors: Record<Category, string> = {
		story: "bg-blue-400",
		person: "bg-pink-400",
		thing: "bg-orange-400",
		place: "bg-green-400",
	};
	return (
		<div className="md:w-[20rem]">
			<div className="bg-black text-2xl relative block">
				<button type="button" onClick={onClick} className="block w-full h-full">
					<div className="absolute left-[-2rem] top-[-0.5rem]">
						<div
							className={`${colors[prompt.category] ?? "bg-orange-400"} text-sm w-16 uppercase`}
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
						<span className="uppercase">{prompt.password}</span>
					</div>
				</button>
			</div>
		</div>
	);
}
