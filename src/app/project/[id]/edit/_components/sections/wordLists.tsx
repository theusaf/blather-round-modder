"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { WordListType } from "@/lib/types/blather";
import { useMemo, useState } from "react";
import { WordListing } from "../WordListing";
import { filterWordList } from "../../_util/filterWordList";
import { AddWordListButton } from "../AddWordListButton";

export default function WordListSection({
	setModal,
}: {
	setModal: (data: WordListType) => void;
}) {
	const wordLists = useProjectStore((state) => state.wordLists);
	const [search, setSearch] = useState("");
	const filteredWordLists = useMemo(
		() => wordLists.filter((list) => filterWordList(list, search)),
		[wordLists, search],
	);

	return (
		<>
			<h3 className="text-lg font-semibold">Word Lists ({wordLists.length})</h3>
			<div className="flex-1">
				<div className="flex gap-2 justify-between">
					<div className="flex-1">
						<input
							className="w-full p-2 rounded-md border-slate-400 border-2"
							type="text"
							name="search"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<AddWordListButton
						onSelect={(data) => {
							setModal(data);
						}}
					/>
				</div>
				<hr className="my-2" />
				<WordListing
					setModal={(data) => {
						setModal(data);
					}}
					wordLists={filteredWordLists}
				/>
			</div>
		</>
	);
}
