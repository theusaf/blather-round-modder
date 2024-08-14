"use client";
import { useState } from "react";
import { ProjectTabMenu } from "./_components/ProjectTabMenu";
import PromptSection from "./_components/sections/prompts";
import WordListSection from "./_components/sections/wordLists";
import SentenceStructureSection from "./_components/sections/sentenceStructures";
import { SearchModal } from "./_components/SearchModal";
import { Modal } from "./_util/modal";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { PromptEditModal } from "./_components/PromptEditModal";
import type {
	NumberedString,
	PromptType,
	WordListType,
} from "@/lib/types/blather";
import { produce } from "immer";
import { ListEditModal } from "./_components/ListEditModal";

export default function ProjectEditPage() {
	const wordLists = useProjectStore((state) => state.wordLists);
	const prompts = useProjectStore((state) => state.prompts);
	const setPrompts = useProjectStore((state) => state.setPrompts);
	const setWordLists = useProjectStore((state) => state.setWordLists);
	const getNextId = useProjectStore((state) => state.getNextId);

	const [activeTab, setActiveTab] = useState("prompts");
	const [modal, setModal] = useState(Modal.None);
	const [modalData, setModalData] = useState<PromptType | WordListType | null>(
		null,
	);

	return (
		<>
			<div className="flex flex-col md:flex-row h-full">
				<SearchModal setModal={setModal} setModalData={setModalData} />
				<ProjectTabMenu
					activeTab={activeTab}
					onTabSelect={(tab) => setActiveTab(tab)}
				/>
				<section className="p-2 w-full flex-1 flex flex-col">
					{activeTab === "prompts" && (
						<PromptSection
							setModal={(data) => {
								setModalData(data);
								setModal(Modal.Prompt);
							}}
						/>
					)}
					{activeTab === "wordLists" && (
						<WordListSection
							setModal={(data) => {
								setModalData(data);
								setModal(Modal.WordList);
							}}
						/>
					)}
					{activeTab === "sentenceStructures" && <SentenceStructureSection />}
				</section>
			</div>
			<PromptEditModal
				initialInput={modalData as PromptType}
				onComplete={(result) => {
					if (result.id === "000") {
						if (result.password) {
							setPrompts(
								produce(prompts, (draft) => {
									draft.push(
										produce(result, (draft) => {
											draft.id = getNextId().toString() as NumberedString;
										}),
									);
								}),
							);
						}
					} else {
						setPrompts(
							produce(prompts, (draft) => {
								const index = draft.findIndex(
									(prompt) => prompt.id === result.id,
								);
								draft[index] = result;
							}),
						);
					}
					setModalData(null);
					setModal(Modal.None);
				}}
				open={modal === Modal.Prompt}
			/>
			<ListEditModal
				listModal={modalData as WordListType}
				onComplete={(result) => {
					if (result.id === "000") {
						if (result.name) {
							// new list item
							setWordLists(
								produce(wordLists, (draft) => {
									const finalResult = produce(result, (draft) => {
										draft.id = getNextId().toString() as NumberedString;
									});
									draft.push(finalResult);
								}),
							);
						}
					} else {
						// update list item
						setWordLists(
							produce(wordLists, (draft) => {
								const index = draft.findIndex((item) => item.id === result.id);
								draft[index] = result;
							}),
						);
					}
					setModal(Modal.None);
					setModalData(null);
				}}
				open={modal === Modal.WordList}
			/>
		</>
	);
}
