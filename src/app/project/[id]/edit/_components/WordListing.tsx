"use client";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { WordListType } from "@/lib/types/blather";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import type { CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";

export function WordListing({
	setModal,
	wordLists,
}: {
	setModal: (wordList: WordListType) => void;
	wordLists: WordListType[];
}) {
	const allWordLists = useProjectStore((state) => state.wordLists);
	const setWordLists = useProjectStore((state) => state.setWordLists);

	const Cell = ({
		index,
		style,
	}: { index: number; style: React.CSSProperties }) => {
		const wordList = wordLists[index];
		if (!wordList) return null;
		return (
			<div style={style} className="p-1">
				<SectionCard>
					<div className="flex justify-between">
						<div>
							<h4 className="text-md font-semibold">{wordList.name}</h4>
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

	return (
		<section className="flex-1">
			<AutoSizer>
				{({ height, width }) => {
					const columnWidth = 300;
					const columnCount = Math.floor(width / columnWidth);
					const getIndex = (col: number, row: number) =>
						row * columnCount + col;
					return (
						<FixedSizeGrid
							height={height}
							width={width}
							rowHeight={85}
							columnWidth={width / columnCount}
							columnCount={Math.floor(width / columnWidth)}
							rowCount={Math.ceil(wordLists.length / columnCount)}
							itemKey={
								({ columnIndex, rowIndex }) =>
									wordLists[getIndex(columnIndex, rowIndex)]?.id ??
									Math.random() // This prevents a crash when the grid item is undefined
							}
						>
							{({
								columnIndex,
								rowIndex,
								style,
							}: {
								columnIndex: number;
								rowIndex: number;
								style: CSSProperties;
							}) => {
								const index = getIndex(columnIndex, rowIndex);
								return <Cell index={index} style={style} />;
							}}
						</FixedSizeGrid>
					);
				}}
			</AutoSizer>
		</section>
	);
}
