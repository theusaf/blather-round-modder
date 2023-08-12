import { FindOptions } from "sequelize";
import { WordListWordModel, WordListModel } from "../../models/blather/word_list.js";
import {
  NumberedString,
  OptionalNumberedString,
  WordListType,
} from "@/lib/types.js";
import { BaseWrapper } from "../base.js";

export class WordList
  extends BaseWrapper<WordListModel, NumberedString>
  implements WordListType
{
  get amount(): OptionalNumberedString {
    return this.model.amount ? `${this.model.amount}` : "";
  }
  set amount(value: OptionalNumberedString) {
    this.model.amount = value ? parseInt(value) : null;
  }

  get maxChoices(): OptionalNumberedString {
    return this.model.maxChoices ? `${this.model.maxChoices}` : "";
  }
  set maxChoices(value: OptionalNumberedString) {
    this.model.maxChoices = value ? parseInt(value) : null;
  }

  get name(): string {
    return this.model.name;
  }
  set name(value: string) {
    this.model.name = value;
  }

  get optional(): boolean {
    return this.model.optional;
  }
  set optional(value: boolean) {
    this.model.optional = value;
  }

  get placeholder(): string {
    return this.model.placeholder ?? "";
  }
  set placeholder(value: string) {
    this.model.placeholder = value;
  }

  get words(): WordListType["words"] {
    return this.model.words;
  }
  set words(_: WordListType["words"]) {
    throw new Error("Cannot set words directly, use `setWords()` instead");
  }
  async setWords(words: WordListType["words"]): Promise<void> {
    const newModels = await Promise.all(
      words.map((word) =>
        WordListWordModel.create({
          word: word.word,
          alwaysChoose: word.alwaysChoose,
        }),
      ),
    );
    await this.model.$set("words", newModels);
  }

  static async create({
    amount,
    maxChoices,
    name,
    optional,
    placeholder,
    words,
  }: WordListType): Promise<WordList> {
    const model = await WordListModel.create({
      amount: amount === "" ? null : parseInt(amount),
      maxChoices: maxChoices === "" ? null : parseInt(maxChoices),
      name: name,
      optional: optional,
      placeholder: placeholder || null,
      words,
    });
    return new WordList(model);
  }

  static async findAll(opts: FindOptions = {}): Promise<WordList[]> {
    const models = await WordListModel.findAll({
      include: WordListWordModel,
      ...opts,
    });
    return models.map((model) => new WordList(model));
  }
}
