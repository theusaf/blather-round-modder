"use client";
import { createProject } from "@/lib/actions/createProject";
import { Tab, TabList, Tabs } from "@mui/joy";
import { startProgress, stopProgress } from "next-nprogress-bar";
import { useState } from "react";
import { CreationSubmissionButton } from "./CreationSubmissionButton";

export function CreationForm() {
	const [selectedTab, setSelectedTab] = useState("scaffold");
	const [name, setName] = useState("");

	return (
		<form
			action={() => {
				startProgress();
				createProject(name, selectedTab).then(() => {
					stopProgress();
				});
			}}
		>
			<div className="flex flex-col gap-2">
				<input
					className="bg-transparent text-xl font-semibold flex-1 text-center p-2"
					placeholder="Project Name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
				/>
				<h3 className="text-xl font-bold text-center">Source</h3>
				<Tabs
					value={selectedTab}
					onChange={(_, value) => {
						if (!value) return;
						setSelectedTab(value as string);
					}}
					className="rounded-md p-1 border-slate-400 border-2 *:!grid *:grid-rows-3 md:*:grid-rows-none md:*:grid-cols-3"
				>
					<TabList disableUnderline>
						<Tab disableIndicator value="full">
							<div className="flex flex-col h-full w-full">
								<h4 className="text-lg font-semibold">Full</h4>
								<p>Start with all the content from the base Jackbox game.</p>
							</div>
						</Tab>
						<Tab disableIndicator value="scaffold">
							<div className="flex flex-col h-full w-full">
								<h4 className="text-lg font-semibold">Scaffold</h4>
								<p>
									Start with the word lists and sentence structures from the
									base Jackbox game, but without the prompts.
								</p>
							</div>
						</Tab>
						<Tab disableIndicator value="empty">
							<div className="flex flex-col h-full w-full">
								<h4 className="text-lg font-semibold">Blanky</h4>
								<p>
									Start with the bare minimum: no word lists, sentence
									structures, nor prompts. Some response word lists will be
									included without any words.
								</p>
							</div>
						</Tab>
					</TabList>
				</Tabs>
				<div className="flex justify-center">
					<CreationSubmissionButton />
				</div>
			</div>
		</form>
	);
}
