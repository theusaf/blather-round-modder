"use client";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { WordListType } from "@/lib/types/blather";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";

export function WordListing({
	setModal,
	wordLists,
}: {
	setModal: (wordList: WordListType) => void;
	wordLists: WordListType[];
}) {
	const allWordLists = useProjectStore((state) => state.wordLists);
	const setWordLists = useProjectStore((state) => state.setWordLists);

	return (
		<section className="flex flex-wrap gap-2">
			{wordLists.map((wordList, index) => (
				<SectionCard key={index} className="w-72">
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
			))}
		</section>
	);
}
