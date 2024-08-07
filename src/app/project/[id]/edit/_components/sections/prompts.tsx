"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PromptListing } from "../PromptListing";
import type {
	Category,
	Difficulty,
	NumberedString,
	PromptType,
} from "@/lib/types/blather";
import { useMemo, useState } from "react";
import { produce } from "immer";
import { PromptEditModal } from "../PromptEditModal";

export default function PromptSection() {
	const prompts = useProjectStore((state) => state.prompts);
	const setPrompts = useProjectStore((state) => state.setPrompts);
	const getNextId = useProjectStore((state) => state.getNextId);
	const [modal, setModal] = useState<PromptType | null>(null);
	const [search, setSearch] = useState<string>("");
	const [filterCategory, setFilterCategory] = useState<Category | "">("");
	const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "">("");

	const filteredPrompts = useMemo(
		() =>
			prompts.filter((prompt) => {
				if (filterCategory && prompt.category !== filterCategory) return false;
				if (filterDifficulty && prompt.difficulty !== filterDifficulty)
					return false;
				return prompt.password.toLowerCase().includes(search.toLowerCase());
			}),
		[prompts, search, filterCategory, filterDifficulty],
	);

	return (
		<>
			<h3 className="text-lg font-semibold">Prompts ({prompts.length})</h3>
			<div className="flex-1">
				<div className="flex flex-wrap md:flex-nowrap gap-2 justify-between">
					<input
						className="w-full p-2 rounded-md border-slate-400 border-2"
						type="text"
						name="search"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<select
						className="p-2"
						value={filterCategory}
						onChange={(event) => {
							setFilterCategory(event.target.value as Category | "");
						}}
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
								setModal({
									category: "thing",
									subcategory: "",
									difficulty: "easy",
									password: "",
									id: "000",
									us: false,
									alternateSpellings: [],
									forbiddenWords: [],
									tailoredWords: [],
								});
							}}
						>
							<FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
						</button>
					</div>
				</div>
				<hr className="my-2" />
				<PromptListing setModal={setModal} prompts={filteredPrompts} />
			</div>
			<PromptEditModal
				initialInput={modal}
				onComplete={(result) => {
					if (result.id === "000") {
						if (result.password) {
							setPrompts(
								produce(prompts, (draft) => {
									draft.push(
										produce(result, (draft) => {
											draft.id = getNextId().toString() as NumberedString;
										}),
									);
								}),
							);
						}
					} else {
						setPrompts(
							produce(prompts, (draft) => {
								const index = draft.findIndex(
									(prompt) => prompt.id === result.id,
								);
								draft[index] = result;
							}),
						);
					}
					setModal(null);
				}}
				open={modal !== null}
			/>
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
