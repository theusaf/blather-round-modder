"use client";
import CenteredModal from "@/lib/components/CenteredModal";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { PromptType, WordListType } from "@/lib/types/blather";
import { similarity } from "@/lib/util/similarity";
import {
	faArrowRight,
	faBolt,
	faComments,
	faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { filterPrompt } from "../_util/filterPrompt";
import { filterWordList } from "../_util/filterWordList";
import { Modal } from "../_util/modal";
import {
	getNewResponseList,
	newBlankWordList,
	newPromptData,
} from "../_util/newItems";

type SearchResult =
	| {
			type: "prompt";
			id: string;
			data: PromptType;
	  }
	| {
			type: "list";
			id: string;
			data: WordListType;
	  }
	| {
			type: "action";
			id: "new-prompt" | "new-list" | "new-list-response";
	  };

const CREATE_ACTIONS = [
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

export function SearchModal({
	setModal,
	open: inputOpen,
	onOpenChange,
}: {
	setModal: (value: [Modal, PromptType | WordListType | null]) => void;
	open?: boolean;
	onOpenChange?: (state: boolean) => void;
}) {
	const [open, setOpen] = useState(inputOpen ?? false);
	const changeOpen = useCallback(
		(state: boolean) => {
			if (onOpenChange) onOpenChange(state);
			else setOpen(state);
		},
		[onOpenChange],
	);
	useEffect(() => {
		if (inputOpen !== undefined && inputOpen !== open) {
			if (open === false) {
				// clear result to avoid accidentally overwriting data in the future
				setSearch("");
				setResults([]);
			}
			setOpen(inputOpen);
		}
	}, [inputOpen, open]);

	const [search, setSearch] = useState("");
	const [searching, setSearching] = useState(false);
	const [results, setResults] = useState<SearchResult[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const timeout = useRef<number | null>(null);
	const prompts = useProjectStore((state) => state.prompts);
	const wordLists = useProjectStore((state) => state.wordLists);

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
		const filteredActions = CREATE_ACTIONS.filter((action) => {
			return (
				action.term.toLowerCase().includes(search.toLowerCase()) ||
				similarity(action.term, search) >= 0.6
			);
		});
		setResults([
			...filteredPrompts.map((prompt) => ({
				type: "prompt" as const,
				id: prompt.id,
				data: prompt,
			})),
			...filteredWordLists.map((list) => ({
				type: "list" as const,
				id: list.id,
				data: list,
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
				changeOpen(true);
				setTimeout(() => inputRef.current?.focus(), 250);
			}
		};
		window.addEventListener("keydown", callback);
		return () => {
			window.removeEventListener("keydown", callback);
		};
	}, [changeOpen]);

	return (
		<CenteredModal open={open} onClose={() => changeOpen(false)}>
			<div className="flex flex-col gap-2" data-id="edit-search-container">
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
					ref={inputRef}
					data-id="search-input"
				/>
				<hr className="border-1 border-slate-700" />
				<div>
					{searching && <div className="text-center">Searching...</div>}
					{!searching && results.length === 0 && (
						<div className="text-center">No results found.</div>
					)}
					{!searching && results.length > 0 && (
						<div className="grid grid-flow-row gap-2" data-id="search-results">
							{results.map((result) => (
								<button
									type="button"
									key={result.id}
									className="p-2 gap-2 flex items-center justify-between rounded-md bg-slate-200 shadow-md"
									onClick={() => {
										switch (result.type) {
											case "prompt": {
												setModal([Modal.Prompt, result.data]);
												break;
											}
											case "action": {
												switch (result.id) {
													case "new-prompt": {
														setModal([Modal.Prompt, newPromptData]);
														break;
													}
													case "new-list": {
														setModal([Modal.WordList, newBlankWordList]);
														break;
													}
													case "new-list-response": {
														setModal([
															Modal.WordList,
															getNewResponseList(null),
														]);
														break;
													}
												}
												break;
											}
											case "list": {
												setModal([Modal.WordList, result.data]);
												break;
											}
										}
										changeOpen(false);
									}}
									data-id="search-result-item"
									data-value={result.type}
								>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon
											icon={
												result.type === "prompt"
													? faComments
													: result.type === "list"
														? faList
														: faBolt
											}
										/>
										<span data-id="search-result-text">
											{result.type === "prompt"
												? result.data.password
												: result.type === "list"
													? result.data.name
													: CREATE_ACTIONS.find(
															(action) => action.id === result.id,
														)?.term}
										</span>
									</div>
									<FontAwesomeIcon icon={faArrowRight} />
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</CenteredModal>
	);
}
