"use client";
import { LabeledInput } from "@/lib/components/LabeledInput";
import OutsideClickDetector from "@/lib/components/OutsideClickDetector";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType } from "@/lib/types/blather";
import { similarity } from "@/lib/util/similarity";
import { Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

export function SubcategorySuggestion({
	promptData,
	onValueChange,
}: {
	promptData: PromptType;
	onValueChange: (value: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const prompts = useProjectStore((state) => state.prompts);
	const subcategories = useMemo(() => {
		const categories: Record<string, Set<string>> = {};
		for (const prompt of prompts) {
			if (!categories[prompt.category]) categories[prompt.category] = new Set();
			if (prompt.subcategory) {
				categories[prompt.category].add(prompt.subcategory);
			}
		}
		const categoriesArray: Record<string, string[]> = {};
		for (const category in categories) {
			categoriesArray[category] = Array.from(categories[category]);
		}
		return categoriesArray;
	}, [prompts]);

	const suggestions =
		subcategories[promptData.category]?.filter((category) => {
			return (
				category.includes(promptData.subcategory) ||
				similarity(category, promptData.subcategory) > 0.6
			);
		}) ?? [];

	return (
		<div className="flex-1">
			<OutsideClickDetector
				onClickOutside={() => setOpen(false)}
				onClick={() => setOpen(true)}
			>
				<Tooltip
					title={
						<div className="grid grid-flow-row gap-2">
							{suggestions.map((suggestion) => (
								<span key={suggestion}>{suggestion}</span>
							))}
						</div>
					}
					arrow
					placement="left"
					open={!!promptData.subcategory && !!suggestions.length && open}
					disableFocusListener
					disableHoverListener
				>
					<div
						onKeyDown={(event) => {
							if (
								event.key === "Tab" &&
								suggestions.length &&
								promptData.subcategory !== "" &&
								promptData.subcategory !== suggestions[0]
							) {
								event.preventDefault();
								onValueChange(suggestions[0]);
							}
						}}
					>
						<LabeledInput
							label="Subcategory"
							name="modal-list-subcategory"
							inputId="modal-list-subcategory"
							placeholder="Enter subcategory"
							value={promptData.subcategory}
							tooltip="Optional. Use to specify different responses for different subcategories. Setting this will cause the game to use response sentences from the list <response-sentence-{category}-{subcategory}>"
							onValueChange={(value) => onValueChange(value)}
						/>
					</div>
				</Tooltip>
			</OutsideClickDetector>
		</div>
	);
}
