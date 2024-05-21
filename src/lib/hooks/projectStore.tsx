import { create } from "zustand";
import { ProjectType } from "../types/project";
import {
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
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  id: null,
  likes: 0,
  name: "",
  description: null,
  public: false,
  ownerId: null,
  prompts: [],
  sentenceStructures: [],
  wordLists: [],
  setPublic: (value) =>
    set((state) =>
      produce(state, (draft) => {
        draft.public = value;
      })
    ),
  setPrompts: (prompts) =>
    set((state) =>
      produce(state, (draft) => {
        draft.prompts = prompts;
      })
    ),
  setSentenceStructures: (sentenceStructures) =>
    set((state) =>
      produce(state, (draft) => {
        draft.sentenceStructures = sentenceStructures;
      })
    ),
  setWordLists: (wordLists) =>
    set((state) =>
      produce(state, (draft) => {
        draft.wordLists = wordLists;
      })
    ),
  setName: (name) =>
    set((state) =>
      produce(state, (draft) => {
        draft.name = name;
      })
    ),
  setDescription: (description) =>
    set((state) =>
      produce(state, (draft) => {
        draft.description = description;
      })
    ),
}));
