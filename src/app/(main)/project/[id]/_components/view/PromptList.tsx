import { CategoryLabel } from "@/lib/components/CategoryLabel";
import { DifficultyLabel } from "@/lib/components/DifficultyLabel";
import SectionCard from "@/lib/components/SectionCard";
import type { PromptType } from "@/lib/types/blather";
import { ItemBlock } from "./ItemBlock";

export function PromptList({ prompts }: { prompts: PromptType[] }) {
	return (
		<div
			className="flex flex-col gap-2 mt-2 overflow-auto h-full"
			data-id="project-prompt"
		>
			{prompts.map((prompt) => {
				const {
					id,
					category,
					password,
					subcategory,
					tailoredWords,
					forbiddenWords,
					alternateSpellings,
					difficulty,
				} = prompt;
				return (
					<SectionCard key={id}>
						<details>
							<summary>
								<div className="inline-flex gap-2">
									<div
										className="w-14 text-center"
										data-id="prompt-category"
										data-value={category}
									>
										<CategoryLabel category={category} />
									</div>
									<div
										className="w-14 text-center"
										data-id="prompt-difficulty"
										data-value={difficulty}
									>
										<DifficultyLabel difficulty={difficulty} />
									</div>
									<span className="font-medium" data-id="prompt-password">
										{password}
									</span>
								</div>
							</summary>
							<div className="grid gap-1 grid-cols-1">
								{!!subcategory && (
									<p data-id="prompt-subcategory" data-value={subcategory}>
										<span className="font-medium">Subcategory:</span>{" "}
										{subcategory}
									</p>
								)}
								{!!alternateSpellings.length && (
									<div data-id="prompt-spelling-container">
										<h6 className="font-medium">Alternate Spellings:</h6>
										<div className="flex gap-1 flex-wrap">
											{alternateSpellings.map((spelling, i) => (
												<ItemBlock key={`${spelling}-${i}`}>
													{spelling}
												</ItemBlock>
											))}
										</div>
									</div>
								)}
								{!!tailoredWords.length && (
									<div data-id="prompt-tailored-word-container">
										<h6 className="font-medium">Tailored Words</h6>
										<div className="flex gap-1 flex-wrap">
											{tailoredWords.map((word, i) => (
												<ItemBlock key={`${word.list}-${word.word}-${i}`}>
													<span>{word.list}</span> - <span>{word.word}</span>
												</ItemBlock>
											))}
										</div>
									</div>
								)}
								{!!forbiddenWords.length && (
									<div data-id="prompt-forbidden-word-container">
										<h6 className="font-medium">Forbidden Words</h6>
										<div className="flex gap-1 flex-wrap">
											{forbiddenWords.map((word, i) => (
												<ItemBlock key={`${word}-${i}`}>
													<span>{word}</span>
												</ItemBlock>
											))}
										</div>
									</div>
								)}
							</div>
						</details>
					</SectionCard>
				);
			})}
		</div>
	);
}
