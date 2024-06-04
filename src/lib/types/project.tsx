import { PromptType, SentenceStructureType, WordListType } from "./blather";

export interface ProjectType {
  id: string | null;
  likes: number;
  name: string;
  description: string | null;
  public: boolean;
  ownerId: string | null;
  prompts: PromptType[];
  sentenceStructures: SentenceStructureType[];
  wordLists: WordListType[];
}

export interface ShallowProjectType {
  id: string | null;
  likes: number;
  public: boolean;
  name: string;
  ownerId: string | null;
  description: string | null;
  promptCount: number;
}
