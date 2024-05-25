"use client";
import { create } from "zustand";
import { ProjectType } from "../types/project";
import {
  NumberedString,
  PromptType,
  SentenceStructureType,
  WordListType,
} from "../types/blather";
import { produce } from "immer";

interface ProjectStoreState extends ProjectType {
  setPublic: (value: boolean) => void;
  setPrompts: (prompts: PromptType[]) => void;
  setSentenceStructures: (sentenceStructures: SentenceStructureType[]) => void;
  setWordLists: (wordLists: WordListType[]) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setProject: (project: ProjectType) => void;
  getNextId: () => number;
  idNumber: number;
}

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
        const updatedProject = produce(project, (draft) => {
          for (const prompt of draft.prompts) {
            prompt.id = get().getNextId().toString() as NumberedString;
          }
          for (const sentenceStructure of draft.sentenceStructures) {
            sentenceStructure.id = get()
              .getNextId()
              .toString() as NumberedString;
          }
          for (const wordList of draft.wordLists) {
            wordList.id = get().getNextId().toString() as NumberedString;
          }
        });
        Object.assign(draft, updatedProject);
      }),
    ),
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
