"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type {
	NumberedString,
	PromptType,
	WordListType,
} from "@/lib/types/blather";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { ListEditModal } from "./_components/ListEditModal";
import NavBar from "./_components/NavBar";
import { ProjectTabMenu } from "./_components/ProjectTabMenu";
import { PromptEditModal } from "./_components/PromptEditModal";
import PromptSection from "./_components/sections/prompts";
import SentenceStructureSection from "./_components/sections/sentenceStructures";
import ValidationSection from "./_components/sections/validation";
import WordListSection from "./_components/sections/wordLists";
import { Modal } from "./_util/modal";
import { newBlankWordList, newPromptData } from "./_util/newItems";

export default function ProjectEditPage() {
	const wordLists = useProjectStore((state) => state.wordLists);
	const prompts = useProjectStore((state) => state.prompts);
	const setPrompts = useProjectStore((state) => state.setPrompts);
	const setWordLists = useProjectStore((state) => state.setWordLists);
	const getNextId = useProjectStore((state) => state.getNextId);

	const [activeTab, setActiveTab] = useState("prompts");
	const [[modal, modalData], setModal] = useState<
		[Modal, PromptType | WordListType | null]
	>([Modal.None, null]);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "m") {
				event.preventDefault();
				if (activeTab === "prompts") {
					setModal([Modal.Prompt, newPromptData]);
				} else if (activeTab === "wordLists") {
					setModal([Modal.WordList, newBlankWordList]);
				}
			}
		};
		window.addEventListener("keydown", listener);
		return () => window.removeEventListener("keydown", listener);
	}, [activeTab]);

	return (
		<>
			<NavBar setModal={setModal} />
			<div className="flex-1">
				<div className="flex flex-col md:flex-row h-full">
					<ProjectTabMenu
						activeTab={activeTab}
						onTabSelect={(tab) => setActiveTab(tab)}
					/>
					<section className="p-2 w-full flex-1 flex flex-col">
						{activeTab === "prompts" && (
							<PromptSection
								setModal={(data) => {
									setModal([Modal.Prompt, data]);
								}}
							/>
						)}
						{activeTab === "wordLists" && (
							<WordListSection
								setModal={(data) => {
									setModal([Modal.WordList, data]);
								}}
							/>
						)}
						{activeTab === "sentenceStructures" && <SentenceStructureSection />}
						{activeTab === "validation" && (
							<ValidationSection
								setModal={(data, modalType) => {
									setModal([modalType, data]);
								}}
								setTab={setActiveTab}
							/>
						)}
					</section>
				</div>
				{modal === Modal.Prompt && (
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
							setModal([Modal.None, null]);
						}}
						open={modal === Modal.Prompt}
					/>
				)}
				{modal === Modal.WordList && (
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
										const index = draft.findIndex(
											(item) => item.id === result.id,
										);
										draft[index] = result;
									}),
								);
							}
							setModal([Modal.None, null]);
						}}
						open={modal === Modal.WordList}
					/>
				)}
			</div>
		</>
	);
}
