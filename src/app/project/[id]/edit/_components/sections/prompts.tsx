"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { Category, Difficulty, PromptType } from "@/lib/types/blather";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { filterPrompt } from "../../_util/filterPrompt";
import { newPromptData } from "../../_util/newItems";
import { PromptListing } from "../PromptListing";

export default function PromptSection({
	setModal,
}: {
	setModal: (data: PromptType) => void;
}) {
	const prompts = useProjectStore((state) => state.prompts);
	const [search, setSearch] = useState<string>("");
	const [filterCategory, setFilterCategory] = useState<Category | "">("");
	const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "">("");

	const filteredPrompts = useMemo(
		() =>
			prompts.filter((prompt) => {
				if (filterCategory && prompt.category !== filterCategory) return false;
				if (filterDifficulty && prompt.difficulty !== filterDifficulty)
					return false;
				return filterPrompt(prompt, search);
			}),
		[prompts, search, filterCategory, filterDifficulty],
	);

	return (
		<>
			<h3
				className="text-lg font-semibold"
				data-id="prompt-count"
				data-value={prompts.length}
			>
				Prompts ({prompts.length})
			</h3>
			<div className="flex-1 flex flex-col">
				<div className="flex flex-wrap md:flex-nowrap gap-2 justify-between">
					<input
						className="w-full p-2 rounded-md border-slate-400 border-2"
						type="text"
						name="search"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						data-id="prompt-search-input"
					/>
					<select
						className="p-2"
						value={filterCategory}
						onChange={(event) => {
							setFilterCategory(event.target.value as Category | "");
						}}
						data-id="prompt-filter-category"
					>
						<SelectOption value="">Choose Category</SelectOption>
						<SelectOption value="thing">Thing</SelectOption>
						<SelectOption value="person">Person</SelectOption>
						<SelectOption value="place">Place</SelectOption>
						<SelectOption value="story">Story</SelectOption>
					</select>
					<select
						className="p-2"
						value={filterDifficulty}
						onChange={(event) => {
							setFilterDifficulty(event.target.value as Difficulty | "");
						}}
						data-id="prompt-filter-difficulty"
					>
						<SelectOption value="">Choose Difficulty</SelectOption>
						<SelectOption value="easy">Easy</SelectOption>
						<SelectOption value="medium">Medium</SelectOption>
						<SelectOption value="hard">Hard</SelectOption>
					</select>
					<div>
						<button
							type="button"
							className="flex items-center h-full"
							onClick={() => {
								setModal(newPromptData);
							}}
							data-id="button-prompt-create"
						>
							<FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
						</button>
					</div>
				</div>
				<hr className="my-2" />
				<PromptListing setModal={setModal} prompts={filteredPrompts} />
			</div>
		</>
	);
}

function SelectOption({
	children,
	value,
}: {
	children: string;
	value: string;
}) {
	return (
		<option className="font-sans" value={value}>
			{children}
		</option>
	);
}
