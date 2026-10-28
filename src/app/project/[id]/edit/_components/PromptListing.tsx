"use client";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import { type CSSProperties, useState } from "react";
import { type CellComponentProps, Grid } from "react-window";
import { CategoryLabel } from "@/lib/components/CategoryLabel";
import { DifficultyLabel } from "@/lib/components/DifficultyLabel";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType } from "@/lib/types/blather";

export function PromptListing({
	prompts,
	setModal,
}: {
	setModal: (prompt: PromptType) => void;
	prompts: PromptType[];
}) {
	const allPrompts = useProjectStore((state) => state.prompts);
	const setPrompts = useProjectStore((state) => state.setPrompts);
	const [columnCount, setColumnCount] = useState(1);

	const Cell = ({ index, style }: { index: number; style: CSSProperties }) => {
		const prompt = prompts[index];
		if (!prompt) return null;
		return (
			<div style={style} className="p-1">
				<SectionCard
					className="flex gap-2 w-full justify-between"
					data-id="prompt-item"
					data-category={prompt.category}
					data-difficulty={prompt.difficulty}
				>
					<div className="flex flex-col gap-2 shrink min-w-0">
						<div className="flex gap-2 overflow-x-hidden">
							<CategoryLabel category={prompt.category} />
							<DifficultyLabel difficulty={prompt.difficulty} />
						</div>
						<div
							className="font-semibold whitespace-nowrap max-w-48 truncate"
							data-id="item-password"
						>
							{prompt.password}
						</div>
					</div>
					<div className="flex gap-2">
						<button
							type="button"
							className="flex items-center"
							onClick={() => {
								setModal(prompt);
							}}
							data-id="button-item-edit"
						>
							<FontAwesomeIcon
								className="w-6 h-6 rounded-md text-white bg-emerald-700 p-2"
								icon={faPenToSquare}
							/>
						</button>
						<button
							type="button"
							className="flex items-center"
							onClick={() => {
								setPrompts(
									produce(allPrompts, (draft) => {
										const index = allPrompts.findIndex(
											(p) => p.id === prompt.id,
										);
										if (index === -1) return;
										draft.splice(index, 1);
									}),
								);
							}}
							data-id="button-item-delete"
						>
							<FontAwesomeIcon
								className="w-6 h-6  rounded-md text-white bg-red-600 p-2"
								icon={faTrash}
							/>
						</button>
					</div>
				</SectionCard>
			</div>
		);
	};

	const PromptGridCell = ({
		columnIndex,
		rowIndex,
		style,
		columnCount,
	}: CellComponentProps<{ columnCount: number }>) => {
		const index = rowIndex * columnCount + columnIndex;
		return <Cell index={index} style={style} />;
	};

	return (
		<div className="flex-1">
			<Grid
				style={{
					width: "100%",
					height: "100%"
				}}
				rowHeight={85}
				columnWidth={`${100 / columnCount}%`}
				columnCount={columnCount}
				rowCount={Math.ceil(prompts.length / columnCount)}
				cellComponent={PromptGridCell}
				cellProps={{ columnCount }}
				onResize={({ width }) => {
					setColumnCount(Math.max(1, Math.floor(width / 300)));
				}}
			/>
		</div>
	);
}
