"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { NumberedString, WordListType } from "@/lib/types/blather";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { ListEditModal } from "../ListEditModal";
import { produce } from "immer";
import { WordListing } from "../WordListing";
import { filterWordList } from "../../_util/filterWordList";
import { Tooltip } from "@mui/material";
import OutsideClickDetector from "@/lib/components/OutsideClickDetector";

export default function WordListSection() {
	const wordLists = useProjectStore((state) => state.wordLists);
	const setWordLists = useProjectStore((state) => state.setWordLists);
	const getNextId = useProjectStore((state) => state.getNextId);
	const [listModal, setListModal] = useState<WordListType | null>(null);
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
					<AddWordListButton onSelect={setListModal} />
				</div>
				<hr className="my-2" />
				<WordListing setModal={setListModal} wordLists={filteredWordLists} />
			</div>
			<ListEditModal
				listModal={listModal}
				onComplete={(result) => {
					if (result.id === "000") {
						if (result.name) {
							// new list item
							setWordLists(
								produce(wordLists, (draft) => {
									const finalResult = produce(result, (draft) => {
										draft.id = getNextId().toString() as NumberedString;
									});
									draft.push(finalResult);
								}),
							);
						}
					} else {
						// update list item
						setWordLists(
							produce(wordLists, (draft) => {
								const index = draft.findIndex((item) => item.id === result.id);
								draft[index] = result;
							}),
						);
					}
					setListModal(null);
				}}
				open={listModal !== null}
			/>
		</>
	);
}

function AddWordListButton({
	onSelect,
}: {
	onSelect: (value: WordListType) => void;
}) {
	const [choiceOpen, setChoiceOpen] = useState(false);

	return (
		<div>
			<Tooltip
				open={choiceOpen}
				placement="left"
				title={
					<OutsideClickDetector onClickOutside={() => setChoiceOpen(false)}>
						<div className="flex flex-col gap-2 my-2">
							<button
								onClick={() => {
									setChoiceOpen(false);
									onSelect({
										amount: "",
										id: "000",
										maxChoices: "",
										name: "",
										optional: false,
										placeholder: "",
										words: [],
									});
								}}
								type="button"
								className="text-left font-sans p-2 bg-slate-300 border-slate-600 border-2 text-black cursor-pointer"
							>
								<h4 className="font-bold text-base">Blank List</h4>
								<p className="text-sm">Regular collection of words</p>
							</button>
							<button
								onClick={() => {
									const responsePhrases =
										useProjectStore
											.getState()
											.wordLists.find(
												(list) => list.name === "response-sentence",
											)
											?.words.map((word) => {
												return {
													...word,
													alwaysChoose: true,
												};
											}) ??
										[
											"It's a lot like",
											"It's kinda similar to",
											"It's nothing like",
											"It has the same vibe as",
											"It's a different genre than",
											"It's not the same form as",
										].map((word) => {
											return {
												alwaysChoose: true,
												word,
											};
										});
									setChoiceOpen(false);
									onSelect({
										amount: "",
										id: "000",
										maxChoices: "1",
										name: "response-sentence-EDITME",
										optional: false,
										placeholder: "It's a lot like",
										words: responsePhrases,
									});
								}}
								type="button"
								className="text-left p-2 bg-slate-300 border-slate-600 border-2 text-black cursor-pointer"
							>
								<h4 className="font-bold text-base">Response List</h4>
								<p className="text-sm">
									Collection of phrases for response sentences
								</p>
							</button>
						</div>
					</OutsideClickDetector>
				}
			>
				<button
					type="button"
					className="flex items-center h-full"
					onClick={() => setChoiceOpen(true)}
				>
					<FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
				</button>
			</Tooltip>
		</div>
	);
}
