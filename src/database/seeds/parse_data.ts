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

const __dirname = dirname(fileURLToPath(import.meta.url)),
  jackboxDataDir = join(__dirname, "jackbox_data");

interface JackboxJET<E> {
  content: E[];
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
    await promptEntity.save();
  }

  for (const sentence of jackboxSentences.content) {
    const { category, structures } = sentence;
    const sentenceEntity = new SentenceStructureEntity();
    sentenceEntity.category = category;
    sentenceEntity.structures = structures.map((word) => {
      const structure = new SentenceStructureStructureEntity();
      structure.value = word;
      return structure;
    });
    await sentenceEntity.save();
  }

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
    await wordListEntity.save();
  }
}
