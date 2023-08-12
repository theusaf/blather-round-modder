import {
  Category,
  Difficulty,
  ListString,
  NumberedString,
  PromptType,
  SentenceStructureType,
} from "@/lib/types";
import {
  SentenceStructureModel,
  SentenceStructureStringModel,
} from "../models/structure";
import { BaseWrapper } from "./base";
import { FindOptions } from "sequelize";
import {
  PromptAlternateSpellingModel,
  PromptForbiddenWordModel,
  PromptModel,
  PromptTailoredWordModel,
} from "../models/password";

export class Prompt
  extends BaseWrapper<PromptType, PromptModel, NumberedString>
  implements PromptType
{
  get category(): PromptType["category"] {
    return this.model.category as Category;
  }
  set category(value: PromptType["category"]) {
    this.model.category = value;
  }

  get difficulty(): PromptType["difficulty"] {
    return this.model.difficulty as Difficulty;
  }
  set difficulty(value: PromptType["difficulty"]) {
    this.model.difficulty = value;
  }

  get password(): PromptType["password"] {
    return this.model.password;
  }
  set password(value: PromptType["password"]) {
    this.model.password = value;
  }

  get subcategory(): PromptType["subcategory"] {
    return this.model.subcategory;
  }
  set subcategory(value: PromptType["subcategory"]) {
    this.model.subcategory = value;
  }

  get us(): PromptType["us"] {
    return this.model.us;
  }
  set us(value: PromptType["us"]) {
    this.model.us = value;
  }

  get forbiddenWords(): string[] {
    return this.model.forbiddenWords.map((word) => word.word);
  }
  set forbiddenWords(value: string[]) {
    throw new Error(
      "Cannot set forbiddenWords directly, use `setForbiddenWords()` instead",
    );
  }
  async setForbiddenWords(forbiddenWords: string[]): Promise<void> {
    const newModels = await Promise.all(
      forbiddenWords.map((word) => PromptForbiddenWordModel.create({ word })),
    );
    await this.model.$set("forbiddenWords", newModels);
  }

  get tailoredWords(): PromptType["tailoredWords"] {
    return this.model.tailoredWords.map((word) => ({
      word: word.word,
      list: word.list as ListString,
    }));
  }
  set tailoredWords(value: PromptType["tailoredWords"]) {
    throw new Error(
      "Cannot set tailoredWords directly, use `setTailoredWords()` instead",
    );
  }
  async setTailoredWords(
    tailoredWords: PromptType["tailoredWords"],
  ): Promise<void> {
    const newModels = await Promise.all(
      tailoredWords.map((word) =>
        PromptTailoredWordModel.create({
          word: word.word,
          list: word.list,
        }),
      ),
    );
    await this.model.$set("tailoredWords", newModels);
  }

  get alternateSpellings(): PromptType["alternateSpellings"] {
    return this.model.alternateSpellings.map((word) => word.spelling);
  }
  set alternateSpellings(value: PromptType["alternateSpellings"]) {
    throw new Error(
      "Cannot set alternateSpellings directly, use `setAlternateSpellings()` instead",
    );
  }
  async setAlternateSpellings(
    alternateSpellings: PromptType["alternateSpellings"],
  ): Promise<void> {
    const newModels = await Promise.all(
      alternateSpellings.map((word) =>
        PromptAlternateSpellingModel.create({ spelling: word }),
      ),
    );
    await this.model.$set("alternateSpellings", newModels);
  }

  static async create({
    tailoredWords,
    subcategory,
    password,
    forbiddenWords,
    difficulty,
    category,
    alternateSpellings,
  }: PromptType): Promise<Prompt> {
    const model = await PromptModel.create({
      category,
      subcategory,
      password,
      difficulty,
      tailoredWords: tailoredWords.map((word) => ({
        word: word.word,
        list: word.list,
      })),
      forbiddenWords: forbiddenWords.map((word) => ({
        word: word,
      })),
      alternateSpellings: alternateSpellings.map((word) => ({
        spelling: word,
      })),
    });
    return new Prompt(model);
  }

  static async findAll(opts: FindOptions = {}): Promise<Prompt[]> {
    const models = await PromptModel.findAll({
      include: [
        PromptAlternateSpellingModel,
        PromptForbiddenWordModel,
        PromptTailoredWordModel,
      ],
      ...opts,
    });
    return models.map((model) => new Prompt(model));
  }
}
