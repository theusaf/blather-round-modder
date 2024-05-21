import "server-only";
import {
  NumberedString,
  OptionalNumberedString,
  WordListType,
} from "@/lib/types/blather";
import { Model } from "firebase-admin/machine-learning";
import Project from "./project";
import { QueryOptions } from "@/lib/types/database";
import { ProjectType } from "@/lib/types/project";

export default class WordList extends Model implements WordListType {
  amount: OptionalNumberedString;
  id: NumberedString;
  maxChoices: OptionalNumberedString;
  name: string;
  optional: boolean;
  placeholder: string;
  words: { alwaysChoose: boolean; word: string }[];
  project: Project;

  constructor(data: Partial<WordListType>, project: Project) {
    super();
    this.amount = data.amount ?? "";
    this.id = data.id ?? "000";
    this.maxChoices = data.maxChoices ?? "";
    this.name = data.name ?? "";
    this.optional = data.optional ?? false;
    this.placeholder = data.placeholder ?? "";
    this.words = data.words ?? [];
    this.project = project;
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
    options?: QueryOptions<ProjectType>
  ): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}
