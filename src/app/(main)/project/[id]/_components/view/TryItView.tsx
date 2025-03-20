"use client";

import type { PromptType } from "@/lib/types/blather";
import dynamic from "next/dynamic";
import { Neucha } from "next/font/google";
import { useState } from "react";
import { CreateSentencePage } from "./try/CreateSentencePage";

const blockyFont = Neucha({ subsets: ["latin"], weight: "400" });

const NonSSRPromptSelectionPage = dynamic(
	() =>
		import("./try/PromptSelectionPage").then(
			(result) => result.PromptSelectionPage,
		),
	{ ssr: false },
);

export function TryItView() {
	const [page, setPage] = useState("prompt");
	const [selectedPrompt, setSelectedPrompt] = useState<PromptType | null>(null);
	return (
		<div className="md:col-span-2 h-[40rem] bg-slate-700 p-2 text-white flex flex-col overflow-hidden">
			<h4 className="font-bold text-lg">Try It</h4>
			<div className={`flex-1 overflow-hidden ${blockyFont.className}`}>
				{page === "prompt" && (
					<NonSSRPromptSelectionPage
						onPromptSelect={(prompt) => {
							setSelectedPrompt(prompt);
							setPage("sentence");
						}}
					/>
				)}
				{page === "sentence" && selectedPrompt && (
					<CreateSentencePage
						prompt={selectedPrompt}
						onBack={() => {
							setSelectedPrompt(null);
							setPage("prompt");
						}}
					/>
				)}
			</div>
		</div>
	);
}
