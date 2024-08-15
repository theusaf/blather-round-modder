"use client";
import { produce } from "immer";
import { create } from "zustand";
import type {
	NumberedString,
	PromptType,
	SentenceStructureType,
	WordListType,
} from "../types/blather";
import type { ProjectType } from "../types/project";

interface ProjectStoreState extends ProjectType {
	setPublic: (value: boolean) => void;
	setPrompts: (prompts: PromptType[]) => void;
	setSentenceStructures: (sentenceStructures: SentenceStructureType[]) => void;
	setWordLists: (wordLists: WordListType[]) => void;
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setProject: (project: ProjectType) => void;
	getProject: () => ProjectType;
	getNextId: () => number;
	idNumber: number;
}

/**
 * Retrieves and manages the project's global state.
 * Used on the project editor page.
 */
export const useProjectStore = create<ProjectStoreState>((set, get) => ({
	id: null,
	likes: 0,
	name: "",
	description: null,
	public: false,
	ownerId: null,
	prompts: [],
	sentenceStructures: [],
	wordLists: [],
	setProject: (project) =>
		set((state) =>
			produce(state, (draft) => {
				let id = get().idNumber;
				const updatedProject = produce(project, (draft) => {
					for (const prompt of draft.prompts) {
						prompt.id = (id++).toString() as NumberedString;
					}
					for (const sentenceStructure of draft.sentenceStructures) {
						sentenceStructure.id = (id++).toString() as NumberedString;
					}
					for (const wordList of draft.wordLists) {
						wordList.id = (id++).toString() as NumberedString;
					}
				});
				Object.assign(draft, { ...updatedProject, idNumber: id });
			}),
		),
	getProject: () => {
		const data = get();
		return {
			id: data.id,
			likes: data.likes,
			name: data.name,
			description: data.description,
			public: data.public,
			ownerId: data.ownerId,
			prompts: data.prompts,
			sentenceStructures: data.sentenceStructures,
			wordLists: data.wordLists,
		};
	},
	setPublic: (value) =>
		set((state) =>
			produce(state, (draft) => {
				draft.public = value;
			}),
		),
	setPrompts: (prompts) =>
		set((state) =>
			produce(state, (draft) => {
				draft.prompts = prompts;
			}),
		),
	setSentenceStructures: (sentenceStructures) =>
		set((state) =>
			produce(state, (draft) => {
				draft.sentenceStructures = sentenceStructures;
			}),
		),
	setWordLists: (wordLists) =>
		set((state) =>
			produce(state, (draft) => {
				draft.wordLists = wordLists;
			}),
		),
	setName: (name) =>
		set((state) =>
			produce(state, (draft) => {
				draft.name = name;
			}),
		),
	setDescription: (description) =>
		set((state) =>
			produce(state, (draft) => {
				draft.description = description;
			}),
		),
	getNextId: () => {
		set((state) =>
			produce(state, (draft) => {
				draft.idNumber += 1;
			}),
		);
		return get().idNumber;
	},
	// lowest id in jackbox games data. unsure if this is necessary
	idNumber: 70571,
}));
