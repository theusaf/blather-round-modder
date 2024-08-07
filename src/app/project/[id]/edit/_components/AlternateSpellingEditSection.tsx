"use client";
import { useState } from "react";
import { LabeledInput } from "@/lib/components/LabeledInput";

export function AlternateSpellingEditSection({
	onSubmit,
}: {
	onSubmit: (value: string) => void;
}) {
	const [value, setValue] = useState("");

	return (
		<div>
			<h4 className="text-lg font-semibold">Alternate Spellings</h4>
			<LabeledInput
				label="Add Alternate Spelling"
				name="modal-list-alternate-spelling"
				inputId="modal-list-alternate-spelling"
				placeholder="Enter alternate spelling"
				tooltip="An alternative spelling for the prompt. Should not include typos. Useful when the prompt is known by multiple names."
				value={value}
				onValueChange={(value) => {
					setValue(value);
				}}
				onKeyDown={(event) => {
					if (event.code === "Enter") {
						if (value.trim() === "") return;
						onSubmit(value);
						setValue("");
					}
				}}
			/>
		</div>
	);
}
