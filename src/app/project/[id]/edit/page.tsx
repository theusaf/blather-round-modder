"use client";
import { useState } from "react";
import { ProjectTabMenu } from "./_components/ProjectTabMenu";
import PromptSection from "./_components/sections/prompts";
import WordListSection from "./_components/sections/wordLists";
import SentenceStructureSection from "./_components/sections/sentenceStructures";

export default function ProjectEditPage() {
	const [activeTab, setActiveTab] = useState("prompts");

	return (
		<div className="flex flex-col md:flex-row h-full">
			<ProjectTabMenu
				activeTab={activeTab}
				onTabSelect={(tab) => setActiveTab(tab)}
			/>
			<section className="p-2 w-full flex-1 flex flex-col">
				{activeTab === "prompts" && <PromptSection />}
				{activeTab === "wordLists" && <WordListSection />}
				{activeTab === "sentenceStructures" && <SentenceStructureSection />}
			</section>
		</div>
	);
}
