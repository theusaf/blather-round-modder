"use client";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { WordListTile } from "@/lib/components/WordListTile";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function TailoredWordEditSection({
	onSubmit,
}: {
	onSubmit: (word: string, list: string) => void;
}) {
	const [word, setWord] = useState("");
	const [list, setList] = useState("");

	return (
		<div>
			<h4 className="text-lg font-semibold">Tailored Word</h4>
			<div className="flex gap-2">
				<LabeledInput
					label="Add Tailored Word"
					name="modal-list-tailored-word"
					inputId="modal-list-tailored-word"
					placeholder="Enter tailored word or <list>"
					tooltip="May make some words more likely or add a custom related word to a list. It is recommended to have at least 10 per prompt."
					value={word}
					className="w-0"
					onValueChange={(value) => {
						setWord(value);
					}}
				/>
				<LabeledInput
					label="List to Add to"
					name="modal-list-tailored-list"
					inputId="modal-list-tailored-list"
					placeholder="Enter list"
					value={list}
					className="w-0"
					onValueChange={(value) => {
						setList(value);
					}}
				/>
				<WordListTile
					list="Search!"
					useValue={false}
					onClose={(selection) => {
						if (!selection) return;
						setList(selection);
					}}
				/>
				<button
					type="button"
					className="flex items-end mb-2"
					onClick={() => {
						if (word.trim() === "" || list.trim() === "") return;
						onSubmit(word, list);
						setWord("");
						setList("");
					}}
				>
					<FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
				</button>
			</div>
		</div>
	);
}
