"use client";
import type { WordListType } from "@/lib/types/blather";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { LabeledCheckbox } from "@/lib/components/LabeledCheckbox";
import SectionCard from "@/lib/components/SectionCard";
import {
	faList,
	faListCheck,
	faPlusCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CenteredModal from "@/lib/components/CenteredModal";

export function ListEditModal({
	listModal,
	onComplete,
	open,
}: {
	listModal: WordListType | null;
	onComplete: (listResult: WordListType) => void;
	open: boolean;
}) {
	const [listData, setListData] = useState<WordListType>(
		listModal ?? {
			amount: "",
			id: "001",
			maxChoices: "",
			name: "",
			optional: false,
			placeholder: "",
			words: [],
		},
	);
	useEffect(() => {
		if (listModal) {
			setListData(listModal);
		}
	}, [listModal]);

	function handleComplete() {
		onComplete(listData);
	}

	return (
		<CenteredModal open={open} onClose={handleComplete}>
			<div className="flex gap-2">
				<LabeledInput
					label="Name"
					name="modal-list-name"
					inputId="modal-list-name"
					placeholder="Enter name"
					value={listData.name}
					onValueChange={(value) => {
						setListData(
							produce(listData, (draft) => {
								draft.name = value;
							}),
						);
					}}
				/>
				<div className="flex items-start">
					<button
						type="button"
						className="bg-emerald-700 rounded-md text-white p-2"
						onClick={handleComplete}
					>
						Done
					</button>
				</div>
			</div>
			<div className="flex flex-wrap gap-2 mt-2">
				<LabeledInput
					label="Max Choices"
					name="modal-list-max-choices"
					inputId="modal-list-max-choices"
					placeholder="Enter max choices"
					value={listData.maxChoices}
					type="number"
					tooltip="When this list is used in a sentence structure, limits how many words can be chosen at a time."
					onValueChange={(value) => {
						setListData(
							produce(listData, (draft) => {
								draft.maxChoices = value;
							}),
						);
					}}
				/>
				<LabeledInput
					label="Amount"
					name="modal-list-amount"
					inputId="modal-list-amount"
					placeholder="Enter amount"
					value={listData.amount}
					tooltip="Probably determines the maximum number of times this list can be used. Usually, leave blank."
					type="number"
					onValueChange={(value) => {
						setListData(
							produce(listData, (draft) => {
								draft.amount = value;
							}),
						);
					}}
				/>
				<LabeledInput
					label="Placeholder"
					name="modal-list-placeholder"
					inputId="modal-list-placeholder"
					placeholder="Enter placeholder"
					value={listData.placeholder}
					tooltip="Text to show when no words are chosen."
					onValueChange={(value) => {
						setListData(
							produce(listData, (draft) => {
								draft.placeholder = value;
							}),
						);
					}}
				/>
				<LabeledCheckbox
					checked={listData.optional}
					onCheckedChange={(value) => {
						setListData(
							produce(listData, (draft) => {
								draft.optional = value;
							}),
						);
					}}
					inputId="modal-list-optional"
					tooltip="Whether the player has to select a word from this list."
					label="Optional"
				/>
			</div>
			<hr className="border-black my-2" />
			<NewWordInput
				isResponseSentence={listData.name.startsWith("response-sentence-")}
				onComplete={(word, alwaysChoose) => {
					setListData(
						produce(listData, (draft) => {
							draft.words.push({ word, alwaysChoose });
						}),
					);
				}}
			/>
			<div className="flex flex-wrap gap-2 mt-2">
				{listData.words.map((word, index) => (
					<SectionCard key={index}>
						<div className="flex gap-2">
							<div className="font-semibold">{word.word}</div>
							<div>
								<Tooltip
									title={
										word.alwaysChoose ? "Always Choose" : "Don't Always Choose"
									}
								>
									<FontAwesomeIcon
										className="w-4 h-4 cursor-help"
										icon={word.alwaysChoose ? faListCheck : faList}
									/>
								</Tooltip>
							</div>
							<div>
								<button
									type="button"
									onClick={() => {
										setListData(
											produce(listData, (draft) => {
												draft.words.splice(index, 1);
											}),
										);
									}}
								>
									<FontAwesomeIcon className="w-4 h-4" icon={faTrash} />
								</button>
							</div>
						</div>
					</SectionCard>
				))}
			</div>
		</CenteredModal>
	);
}

function NewWordInput({
	onComplete,
	isResponseSentence,
}: {
	onComplete: (word: string, alwaysChoose: boolean) => void;
	isResponseSentence: boolean;
}) {
	const [newWord, setNewWord] = useState("");
	const [alwaysChoose, setAlwaysChoose] = useState(isResponseSentence);

	return (
		<div className="flex gap-2 items-end">
			<LabeledInput
				label="New Word"
				name="modal-list-new-word"
				inputId="modal-list-new-word"
				placeholder="Enter text or <list>..."
				className="w-0" // CSS is strange...
				value={newWord}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						if (newWord === "") return;
						onComplete(newWord, alwaysChoose);
						setAlwaysChoose(false);
						setNewWord("");
					}
				}}
				onValueChange={(value) => {
					setNewWord(value);
				}}
			/>
			<LabeledCheckbox
				checked={alwaysChoose}
				onCheckedChange={(value) => {
					setAlwaysChoose(value);
				}}
				inputId="modal-list-new-word-always-choose"
				label="Always Choose"
				tooltip="Whether this word should always be shown when this list is used."
			/>
			<button
				type="button"
				className="mb-1"
				onClick={() => {
					onComplete(newWord, alwaysChoose);
					setAlwaysChoose(isResponseSentence);
					setNewWord("");
				}}
			>
				<FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
			</button>
		</div>
	);
}
