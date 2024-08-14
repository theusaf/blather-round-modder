"use client";
import OutsideClickDetector from "@/lib/components/OutsideClickDetector";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { WordListType } from "@/lib/types/blather";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { useState } from "react";

export function AddWordListButton({
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
