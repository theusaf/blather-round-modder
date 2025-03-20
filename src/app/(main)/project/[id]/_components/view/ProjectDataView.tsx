"use client";
import type { ProjectType } from "@/lib/types/project";
import { ProjectContext } from "./ProjectContext";
import { type ReactNode, useContext, useState } from "react";
import { CategoryLabel } from "@/lib/components/CategoryLabel";
import SectionCard from "@/lib/components/SectionCard";
import { DifficultyLabel } from "@/lib/components/DifficultyLabel";

export function ProjectDataView({ project }: { project: ProjectType }) {
	return (
		<ProjectContext value={project}>
			<div className="grid gap-2 grid-cols-1 md:grid-cols-3">
				<div className="md:col-span-2 h-[40rem] bg-slate-700 p-2">
					<h4 className="font-bold text-lg text-white">Try It</h4>
				</div>
				<div>
					<h4 className="font-bold text-lg">Content</h4>
					<div className="grid gap-2">
						<PromptView />
					</div>
				</div>
			</div>
		</ProjectContext>
	);
}

function PromptView() {
	const project = useContext(ProjectContext);
	const [search, setSearch] = useState("");
	if (!project) return;
	const prompts = search
		? project.prompts.filter((prompt) => {
				const { password, alternateSpellings } = prompt;
				if (password.toLowerCase().includes(search.toLowerCase())) return true;
				if (
					alternateSpellings.find((spelling) =>
						spelling.toLowerCase().includes(search.toLowerCase()),
					)
				) {
					return true;
				}
			})
		: project.prompts;
	return (
		<div>
			<h5 className="text-md font-semibold">Prompts</h5>
			<input
				placeholder="Search"
				className="p-1 rounded-md border-2 border-slate-500 w-full"
				value={search}
				onInput={(evt) => setSearch(evt.currentTarget.value)}
			/>
			<div className="flex flex-col gap-2 mt-2">
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
										<div className="w-14 text-center">
											<CategoryLabel category={category} />
										</div>
										<div className="w-14 text-center">
											<DifficultyLabel difficulty={difficulty} />
										</div>
										<span className="font-medium">{password}</span>
									</div>
								</summary>
								<div className="grid gap-1 grid-cols-1">
									{!!subcategory && (
										<p>
											<span className="font-medium">Subcategory:</span>{" "}
											{subcategory}
										</p>
									)}
									{!!alternateSpellings.length && (
										<div>
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
										<div>
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
										<div>
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
		</div>
	);
}

function ItemBlock({ children }: { children: ReactNode }) {
	return (
		<div className="border-2 border-slate-300 p-1 rounded">{children}</div>
	);
}
