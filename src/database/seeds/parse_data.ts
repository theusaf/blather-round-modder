import {
  PromptType,
  SentenceStructureType,
  WordListType,
} from "@/lib/blather_types.js";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  PromptEntity,
  PromptForbiddenWordEntity,
  PromptSpellingEntity,
  PromptTailoredWordEntity,
} from "../entity/blather/Prompt.js";
import {
  SentenceStructureEntity,
  SentenceStructureStructureEntity,
} from "../entity/blather/SentenceStructure.js";
import {
  WordListEntity,
  WordListWordEntity,
} from "../entity/blather/WordList.js";
import { ProjectEntity } from "../entity/system/Project.js";
import { UserEntity } from "../entity/system/User.js";

const __dirname = dirname(fileURLToPath(import.meta.url)),
  jackboxDataDir = join(__dirname, "jackbox_data");

export interface JackboxJET<E> {
  content: E[];
}

export interface JackboxJET2<E> {
  fields: E[];
}

export async function seed() {
  const jackboxPrompts: JackboxJET<PromptType> = JSON.parse(
    await readFile(join(jackboxDataDir, "BlankyBlankPasswords.jet"), "utf-8"),
  );
  const jackboxSentences: JackboxJET<SentenceStructureType> = JSON.parse(
    await readFile(
      join(jackboxDataDir, "BlankyBlankSentenceStructures.jet"),
      "utf-8",
    ),
  );
  const jackboxWordLists: JackboxJET<WordListType> = JSON.parse(
    await readFile(join(jackboxDataDir, "BlankyBlankWordLists.jet"), "utf-8"),
  );

  const promptEntities = [];
  for (const prompt of jackboxPrompts.content) {
    const {
      category,
      alternateSpellings,
      difficulty,
      forbiddenWords,
      password,
      subcategory,
      tailoredWords,
      us,
    } = prompt;
    const promptEntity = new PromptEntity();
    promptEntity.category = category;
    promptEntity.difficulty = difficulty;
    promptEntity.subcategory = subcategory || null;
    promptEntity.us = !!us;
    promptEntity.password = password;
    const forbiddenWordEntities = forbiddenWords.map((word) => {
      const entity = new PromptForbiddenWordEntity();
      entity.value = word;
      return entity;
    });
    promptEntity.forbiddenWords = forbiddenWordEntities;
    const tailoredWordEntities = tailoredWords.map(({ word, list }) => {
      const entity = new PromptTailoredWordEntity();
      entity.word = word;
      entity.list = list;
      return entity;
    });
    promptEntity.tailoredWords = tailoredWordEntities;
    const alternateSpellingEntities = alternateSpellings.map((word) => {
      const entity = new PromptSpellingEntity();
      entity.value;
      return entity;
    });
    promptEntity.alternateSpellings = alternateSpellingEntities;
    promptEntities.push(promptEntity);
  }

  const sentenceEntities = [];
  for (const sentence of jackboxSentences.content) {
    const { category, structures } = sentence;
    const sentenceEntity = new SentenceStructureEntity();
    sentenceEntity.category = category;
    sentenceEntity.structures = structures.map((word) => {
      const structure = new SentenceStructureStructureEntity();
      structure.value = word;
      return structure;
    });
    sentenceEntities.push(sentenceEntity);
  }

  const wordListEntities = [];
  for (const wordList of jackboxWordLists.content) {
    const { amount, maxChoices, name, optional, placeholder, words } = wordList;
    const wordListEntity = new WordListEntity();
    wordListEntity.amount = +amount || null;
    wordListEntity.maxChoices = +maxChoices || null;
    wordListEntity.name = name;
    wordListEntity.optional = !!optional;
    wordListEntity.placeholder = placeholder || null;
    const wordEntities = words.map(({ word, alwaysChoose }) => {
      const entity = new WordListWordEntity();
      entity.word = word;
      entity.alwaysChoose = !!alwaysChoose;
      return entity;
    });
    wordListEntity.words = wordEntities;
    wordListEntities.push(wordListEntity);
  }

  const project = new ProjectEntity();
  project.name = "BlankyBlank Main";
  project.prompts = promptEntities;
  project.sentenceStructures = sentenceEntities;
  project.wordLists = wordListEntities;
  project.description = "The default project imported from Jackbox Games.";

  const user = new UserEntity();
  user.username = "jackbox";
  user.password = "";
  user.email = "null";
  user.projects = Promise.resolve([project]);
  await user.save();
}
