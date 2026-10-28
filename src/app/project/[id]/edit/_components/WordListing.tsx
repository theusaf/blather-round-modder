"use client";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import { useState } from "react";
import { type CellComponentProps, Grid } from "react-window";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { WordListType } from "@/lib/types/blather";

export function WordListing({
	setModal,
	wordLists,
}: {
	setModal: (wordList: WordListType) => void;
	wordLists: WordListType[];
}) {
	const allWordLists = useProjectStore((state) => state.wordLists);
	const setWordLists = useProjectStore((state) => state.setWordLists);
	const [columnCount, setColumnCount] = useState(1);

	const Cell = ({
		index,
		style,
	}: {
		index: number;
		style: React.CSSProperties;
	}) => {
		const wordList = wordLists[index];
		if (!wordList) return null;
		return (
			<div style={style} className="p-1" data-id="word-list-container">
				<SectionCard>
					<div className="flex justify-between gap-1">
						<div className="min-w-0">
							<h4
								className="text-md font-semibold truncate"
								title={wordList.name}
								data-id="word-list-name"
							>
								{wordList.name}
							</h4>
							<div>Words: {wordList.words.length}</div>
						</div>
						<div className="flex gap-2 items-center text-white">
							<button
								type="button"
								className="flex rounded-md p-2 bg-emerald-700"
								onClick={() => {
									setModal(wordList);
								}}
							>
								<FontAwesomeIcon className="w-6 h-6" icon={faPenToSquare} />
							</button>
							<button
								type="button"
								className="flex rounded-md p-2 bg-red-600"
								onClick={() => {
									setWordLists(
										produce(allWordLists, (draft) => {
											const index = draft.findIndex(
												(item) => item.id === wordList.id,
											);
											draft.splice(index, 1);
										}),
									);
								}}
							>
								<FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
							</button>
						</div>
					</div>
				</SectionCard>
			</div>
		);
	};

	const WordGridCell = ({
		columnIndex,
		rowIndex,
		style,
		columnCount,
	}: CellComponentProps<{ columnCount: number }>) => {
		const index = rowIndex * columnCount + columnIndex;
		return <Cell index={index} style={style} />;
	};

	return (
		<section className="flex-1">
			<Grid
				style={{
					width: "100%",
					height: "100%"
				}}
				rowHeight={85}
				columnWidth={`${100 / columnCount}%`}
				columnCount={columnCount}
				rowCount={Math.ceil(wordLists.length / columnCount)}
				cellComponent={WordGridCell}
				cellProps={{ columnCount }}
				onResize={({ width }) => {
					setColumnCount(Math.max(1, Math.floor(width / 300)));
				}}
			/>
		</section>
	);
}
