import "server-only";
import {
  Category,
  Difficulty,
  NumberedString,
  PromptType,
} from "@/lib/types/blather";
import { Model } from ".";
import Project from "./project";

export default class Prompt extends Model implements PromptType {
  alternateSpellings: string[];
  category: Category;
  difficulty: Difficulty;
  forbiddenWords: string[];
  id: NumberedString;
  password: string;
  subcategory: string;
  tailoredWords: { list: `<${string}>`; word: string }[];
  us: boolean;
  project: Project;

  constructor(data: Partial<PromptType>, project: Project) {
    super();
    this.alternateSpellings = data.alternateSpellings ?? [];
    this.category = data.category ?? "thing";
    this.difficulty = data.difficulty ?? "easy";
    this.forbiddenWords = data.forbiddenWords ?? [];
    this.id = data.id ?? "000";
    this.password = data.password ?? "";
    this.subcategory = data.subcategory ?? "";
    this.tailoredWords = data.tailoredWords ?? [];
    this.us = data.us ?? false;
    this.project = project;
  }

  save(): Promise<this> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
