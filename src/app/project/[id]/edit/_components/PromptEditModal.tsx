"use client";
import CenteredModal from "@/lib/components/CenteredModal";
import { HorizontalRadioSelector } from "@/lib/components/HorizontalRadioSelector";
import { LabeledCheckbox } from "@/lib/components/LabeledCheckbox";
import { LabeledInput } from "@/lib/components/LabeledInput";
import OutsideClickDetector from "@/lib/components/OutsideClickDetector";
import SectionCard from "@/lib/components/SectionCard";
import { WordListTile } from "@/lib/components/WordListTile";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { Category, Difficulty, PromptType } from "@/lib/types/blather";
import { similarity } from "@/lib/util/similarity";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { newPromptData } from "../_util/newItems";
import { AlternateSpellingEditSection } from "./AlternateSpellingEditSection";
import { ForbiddenWordEditSection } from "./ForbiddenWordEditSection";
import { TailoredWordEditSection } from "./TailoredWordEditSection";

export function PromptEditModal({
	initialInput,
	onComplete,
	open,
}: {
	initialInput: PromptType | null;
	onComplete: (result: PromptType) => void;
	open: boolean;
}) {
	const [promptData, setPromptData] = useState<PromptType>(
		initialInput ?? newPromptData,
	);
	useEffect(() => {
		if (initialInput) {
			setPromptData(initialInput);
		}
	}, [initialInput]);

	const onClose = () => {
		onComplete(promptData);
	};

	return (
		<CenteredModal open={open} onClose={onClose}>
			<div className="flex gap-2 justify-between">
				<LabeledInput
					label="Password"
					name="modal-list-password"
					inputId="modal-list-password"
					placeholder="Enter password"
					value={promptData.password}
					onValueChange={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.password = value;
							}),
						);
					}}
				/>
				<div className="flex items-start">
					<button
						type="button"
						className="bg-emerald-700 rounded-md text-white p-2"
						onClick={onClose}
					>
						Done
					</button>
				</div>
			</div>
			<div className="flex flex-wrap gap-2 mt-2">
				<HorizontalRadioSelector
					values={["thing", "person", "place", "story"]}
					value={promptData.category}
					onChange={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.category = value as Category;
							}),
						);
					}}
					label="Category"
				/>
				<HorizontalRadioSelector
					values={["easy", "medium", "hard"]}
					value={promptData.difficulty}
					onChange={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.difficulty = value as Difficulty;
							}),
						);
					}}
					label="Difficulty"
				/>
				<SubcategorySuggestion
					promptData={promptData}
					onValueChange={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.subcategory = value;
							}),
						);
					}}
				/>
				<LabeledCheckbox
					label="US-Centric"
					name="modal-list-us"
					inputId="modal-list-us"
					checked={promptData.us}
					onCheckedChange={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.us = value;
							}),
						);
					}}
				/>
			</div>
			<hr className="my-2" />
			<div>
				<AlternateSpellingEditSection
					onSubmit={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.alternateSpellings.push(value);
							}),
						);
					}}
				/>
				<div className="flex flex-wrap gap-2 mt-2">
					{promptData.alternateSpellings.map((spelling, index) => (
						<SectionCard key={index} className="border-slate-400">
							<div className="flex gap-2 items-center">
								<span>{spelling}</span>
								<button
									type="button"
									className="flex items-center h-min"
									onClick={() => {
										setPromptData(
											produce(promptData, (draft) => {
												draft.alternateSpellings.splice(index, 1);
											}),
										);
									}}
								>
									<FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
								</button>
							</div>
						</SectionCard>
					))}
				</div>
				<hr className="my-2" />
				<ForbiddenWordEditSection
					onSubmit={(value) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.forbiddenWords.push(value);
							}),
						);
					}}
				/>
				<div className="flex flex-wrap gap-2 mt-2">
					{promptData.forbiddenWords.map((word, index) => (
						<SectionCard key={index} className="border-slate-400">
							<div className="flex gap-2 items-center">
								<span>{word}</span>
								<button
									type="button"
									className="flex items-center h-min"
									onClick={() => {
										setPromptData(
											produce(promptData, (draft) => {
												draft.forbiddenWords.splice(index, 1);
											}),
										);
									}}
								>
									<FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
								</button>
							</div>
						</SectionCard>
					))}
				</div>
				<hr className="my-2" />
				<TailoredWordEditSection
					onSubmit={(word, list) => {
						setPromptData(
							produce(promptData, (draft) => {
								draft.tailoredWords.push({ word, list: `<${list}>` });
							}),
						);
					}}
				/>
				<div className="grid grid-cols-3 gap-2 overflow-hidden">
					<div className="border-r-2 border-slate-600 mt-2">
						<h4 className="font-semibold text-lg">Suggestions</h4>
					</div>
					<TailoredWordTileList
						promptData={promptData}
						setPromptData={setPromptData}
					/>
				</div>
			</div>
		</CenteredModal>
	);
}

function TailoredWordTileList({
	promptData,
	setPromptData,
}: { promptData: PromptType; setPromptData: (data: PromptType) => void }) {
	return (
		<div className="grid md:grid-cols-3 gap-2 mt-2 col-span-2">
			{promptData.tailoredWords.map((word, index) => (
				<SectionCard key={index} className="overflow-hidden">
					<div className="flex gap-2 items-center justify-between">
						<div className="flex gap-2 items-center min-w-0">
							<WordListTile
								onClose={(list) => {
									if (!list) return;
									setPromptData(
										produce(promptData, (draft) => {
											draft.tailoredWords[index].list = `<${list}>`;
										}),
									);
								}}
								list={word.list.slice(1, -1)}
							/>
							<span className="truncate" title={word.word}>
								{word.word}
							</span>
						</div>
						<button
							type="button"
							className="flex items-center h-min"
							onClick={() => {
								setPromptData(
									produce(promptData, (draft) => {
										draft.tailoredWords.splice(index, 1);
									}),
								);
							}}
						>
							<FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
						</button>
					</div>
				</SectionCard>
			))}
		</div>
	);
}

function SubcategorySuggestion({
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
