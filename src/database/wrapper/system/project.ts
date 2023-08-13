import { ProjectModel } from "@/database/models/system/project.js";
import { BaseWrapper } from "../base.js";
import { User } from "./user.js";
import { Prompt } from "../blather/password.js";
import { SentenceStructure } from "../blather/structure.js";
import { WordList } from "../blather/word_list.js";

export class Project extends BaseWrapper<ProjectModel> {
  get name(): string {
    return this.model.name;
  }
  set name(value: string) {
    this.model.name = value;
  }

  get description(): string {
    return this.model.description;
  }
  set description(value: string) {
    this.model.description = value;
  }

  get user(): User {
    return new User(this.model.user);
  }
  set user(_: User) {
    throw new Error("Cannot set user.");
  }

  get prompts(): Prompt[] {
    return this.model.prompts.map((prompt) => new Prompt(prompt));
  }
  set prompts(_: Prompt[]) {
    throw new Error("Cannot set prompts directly, use `setPrompts()` instead");
  }

  get sentenceStructures(): SentenceStructure[] {
    return this.model.sentenceStructures.map(
      (structure) => new SentenceStructure(structure),
    );
  }
  set sentenceStructures(_: SentenceStructure[]) {
    throw new Error(
      "Cannot set sentenceStructures directly, use `setSentenceStructures()` instead",
    );
  }

  get wordLists(): WordList[] {
    return this.model.wordLists.map((wordList) => new WordList(wordList));
  }
  set wordLists(_: WordList[]) {
    throw new Error(
      "Cannot set wordLists directly, use `setWordLists()` instead",
    );
  }
}
