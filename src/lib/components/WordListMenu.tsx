"use client";
import { filterWordList } from "@/app/project/[id]/edit/_util/filterWordList";
import { useMemo, useState } from "react";
import { useProjectStore } from "../hooks/projectStore";
import type { WordListType } from "../types/blather";
import OutsideClickDetector from "./OutsideClickDetector";
import { WordListMenuItem } from "./WordListMenuItem";

/**
 * A menu that displays a list of available lists with a filter.
 *
 * @param onClose The function to call when the menu is closed.
 * @param initialValue The initial value of the search input.
 */
export function WordListMenu({
	onClose,
	initialValue,
}: {
	onClose: (selection: string | null) => void;
	initialValue: string;
}) {
	const [search, setSearch] = useState(initialValue);
	const wordLists = useProjectStore((state) => state.wordLists);
	const filteredLists = useMemo(() => {
		return wordLists.filter((list) => filterWordList(list, search));
	}, [search, wordLists]);

	return (
		<OutsideClickDetector
			onClickOutside={() => {
				onClose(null);
			}}
		>
			<div>
				<input
					type="text"
					className="rounded-md p-1 border-2 border-slate-400 w-full mb-2 text-md text-black bg-white"
					placeholder="Search"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					autoFocus
				/>
				<div className="max-h-64 overflow-y-auto">
					<div className="grid grid-flow-row text-md">
						{filteredLists.length === 0 && (
							<p className="text-gray-300">No lists found.</p>
						)}
						{"PLAYERGUESS".includes(search.toUpperCase()) && (
							<WordListMenuItem
								list={
									{
										name: "PLAYERGUESS",
									} as WordListType
								}
								onClose={() => {
									onClose("PLAYERGUESS");
								}}
							/>
						)}
						{filteredLists.map((list) => (
							<WordListMenuItem
								key={list.id}
								list={list}
								onClose={() => {
									onClose(list.name);
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</OutsideClickDetector>
	);
}
