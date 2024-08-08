"use client";
import CenteredModal from "@/lib/components/CenteredModal";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { useState, useRef, useEffect, useCallback } from "react";
import { filterPrompt } from "../_util/filterPrompt";
import { filterWordList } from "../_util/filterWordList";
import { similarity } from "@/lib/util/similarity";

type SearchResult =
	| {
			type: "prompt" | "list";
			id: string;
	  }
	| {
			type: "action";
			id: "new-prompt" | "new-list" | "new-list-response";
	  };

export function SearchModal() {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [searching, setSearching] = useState(false);
	const [results, setResults] = useState<SearchResult[]>([]);
	const timeout = useRef<number | null>(null);
	const prompts = useProjectStore((state) => state.prompts);
	const wordLists = useProjectStore((state) => state.wordLists);
	const actions = [
		{
			term: "Create New Prompt",
			id: "new-prompt",
		},
		{
			term: "Create New Word List",
			id: "new-list",
		},
		{
			term: "Create New Response Word List",
			id: "new-list-response",
		},
	];

	const executeSearch = useCallback(() => {
		if (search === "") {
			setResults([]);
			return;
		}

		const filteredPrompts = prompts.filter((prompt) =>
			filterPrompt(prompt, search),
		);
		const filteredWordLists = wordLists.filter((list) =>
			filterWordList(list, search),
		);
		const filteredActions = actions.filter((action) => {
			return (
				action.term.toLowerCase().includes(search.toLowerCase()) ||
				similarity(action.term, search) >= 0.6
			);
		});
		setResults([
			...filteredPrompts.map((prompt) => ({
				type: "prompt" as const,
				id: prompt.id,
			})),
			...filteredWordLists.map((list) => ({
				type: "list" as const,
				id: list.id,
			})),
			...filteredActions.map((action) => ({
				type: "action" as const,
				id: action.id as "new-prompt" | "new-list" | "new-list-response",
			})),
		]);
	}, [search, prompts, wordLists]);

	useEffect(() => {
		if (searching) {
			if (timeout.current) clearTimeout(timeout.current);
			timeout.current = window.setTimeout(() => {
				setSearching(false);
				executeSearch();
			}, 500);
		} else {
			if (timeout.current) clearTimeout(timeout.current);
		}
		return () => {
			if (timeout.current) clearTimeout(timeout.current);
		};
	}, [searching, executeSearch]);

	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", callback);
		return () => {
			window.removeEventListener("keydown", callback);
		};
	}, []);

	return (
		<CenteredModal open={open} onClose={() => setOpen(false)}>
			<div className="flex flex-col gap-2">
				<input
					onInput={(event) => {
						setSearch((event.target as HTMLInputElement).value);
						setSearching(true);
					}}
					value={search}
					className="p-2 border-2 border-slate-400 rounded-md"
					type="text"
					autoFocus
					placeholder="Quick Search..."
				/>
				<hr className="border-1 border-slate-700" />
				<div>
					{searching && <div className="text-center">Searching...</div>}
					{!searching && results.length === 0 && (
						<div className="text-center">No results found.</div>
					)}
					{!searching && results.length > 0 && (
						<div>
							{results.map((result) => {
								switch (result.type) {
									case "prompt":
										return (
											<div key={result.id}>
												Prompt:{" "}
												{
													prompts.find((prompt) => prompt.id === result.id)
														?.password
												}
											</div>
										);
									case "list":
										return (
											<div key={result.id}>
												List:{" "}
												{wordLists.find((list) => list.id === result.id)?.name}
											</div>
										);
									case "action":
										return (
											<div key={result.id}>
												Action:{" "}
												{
													actions.find((action) => action.id === result.id)
														?.term
												}
											</div>
										);
								}
							})}
						</div>
					)}
				</div>
			</div>
		</CenteredModal>
	);
}
