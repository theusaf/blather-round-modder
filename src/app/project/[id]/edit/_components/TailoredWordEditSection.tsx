"use client";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { WordListTile } from "@/lib/components/WordListTile";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type RefObject, useState } from "react";

export function TailoredWordEditSection({
	onSubmit,
	list,
	setList,
	inputRef,
}: {
	onSubmit: (word: string, list: string) => void;
	list: string;
	setList: (list: string) => void;
	inputRef: RefObject<HTMLInputElement | null>;
}) {
	const [word, setWord] = useState("");

	return (
		<div>
			<h4 className="text-lg font-semibold">Tailored Word</h4>
			<form
				onSubmit={(evt) => {
					evt.preventDefault();
					if (word.trim() === "" || list.trim() === "") return;
					onSubmit(word, list);
					setWord("");
					setList("");
				}}
			>
				<div className="flex gap-2">
					<LabeledInput
						inputRef={inputRef}
						label="Add Tailored Word"
						name="modal-list-tailored-word"
						inputId="modal-list-tailored-word"
						placeholder="Enter tailored word or <list>"
						tooltip="May make some words more likely or add a custom related word to a list. It is recommended to have at least 10 per prompt."
						value={word}
						className="w-0"
						type="search"
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
						type="search"
						onValueChange={(value) => {
							setList(value);
						}}
					/>
					<div className="flex items-end">
						<WordListTile
							list="Search!"
							useValue={false}
							onClose={(selection) => {
								if (!selection) return;
								setList(selection);
							}}
						/>
					</div>
					<button type="submit" className="flex items-end mb-2 cursor-pointer">
						<FontAwesomeIcon className="w-12 h-12" icon={faPlusCircle} />
					</button>
				</div>
			</form>
		</div>
	);
}
