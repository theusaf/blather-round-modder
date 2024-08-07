"use client";
import { useState } from "react";
import { LabeledInput } from "@/lib/components/LabeledInput";

export function ForbiddenWordEditSection({
	onSubmit,
}: {
	onSubmit: (value: string) => void;
}) {
	const [value, setValue] = useState("");

	return (
		<div>
			<h4 className="text-lg font-semibold">Forbidden Words</h4>
			<LabeledInput
				label="Add Forbidden Word"
				name="modal-list-forbidden-word"
				inputId="modal-list-forbidden-word"
				placeholder="Enter forbidden word"
				tooltip="A word that should not appear in list choices. Can prevent a prompt from being guessed too easily. Does not affect player input."
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
