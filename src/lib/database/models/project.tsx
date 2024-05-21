import "server-only";
import {
  PromptType,
  SentenceStructureType,
  WordListType,
} from "@/lib/types/blather";
import { ProjectType } from "@/lib/types/project";
import { Model } from ".";
import { QueryOptions } from "@/lib/types/database";

export default class Project extends Model implements ProjectType {
  id: string | null;
  likes: number;
  name: string;
  description: string | null;
  public: boolean;
  ownerId: string | null;
  prompts: PromptType[];
  sentenceStructures: SentenceStructureType[];
  wordLists: WordListType[];

  constructor(data: Partial<ProjectType>) {
    super();
    this.id = data.id ?? null;
    this.likes = data.likes ?? 0;
    this.name = data.name ?? "";
    this.description = data.description ?? null;
    this.public = data.public ?? false;
    this.ownerId = data.ownerId ?? null;
    this.prompts = data.prompts ?? [];
    this.sentenceStructures = data.sentenceStructures ?? [];
    this.wordLists = data.wordLists ?? [];
  }

  async save(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  async delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static async findById(id: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }

  static async findAll(
    queryOptions?: QueryOptions<ProjectType>
  ): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}
