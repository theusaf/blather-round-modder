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

  const user = new UserEntity();
  user.username = "jackbox";
  user.password = "";
  user.email = "null";
  await user.save();

  const project = new ProjectEntity();
  project.name = "BlankyBlank Main";
  project.description = "The default project imported from Jackbox Games.";
  project.owner = user;
  await project.save();

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
    await promptEntity.save();

    for (const word of forbiddenWords) {
      const entity = new PromptForbiddenWordEntity();
      entity.value = word;
      entity.prompt = Promise.resolve(promptEntity);
      await entity.save();
    }
    for (const { word, list } of tailoredWords) {
      const entity = new PromptTailoredWordEntity();
      entity.word = word;
      entity.list = list;
      entity.prompt = Promise.resolve(promptEntity);
      await entity.save();
    }
    for (const word of alternateSpellings) {
      const entity = new PromptSpellingEntity();
      entity.value = word;
      entity.prompt = Promise.resolve(promptEntity);
      await entity.save();
    }
  }

  for (const sentence of jackboxSentences.content) {
    const { category, structures } = sentence;
    const sentenceEntity = new SentenceStructureEntity();
    sentenceEntity.category = category;
    await sentenceEntity.save();
    for (const word of structures) {
      const structure = new SentenceStructureStructureEntity();
      structure.value = word;
      await structure.save();
    }
  }

  for (const wordList of jackboxWordLists.content) {
    const { amount, maxChoices, name, optional, placeholder, words } = wordList;
    const wordListEntity = new WordListEntity();
    wordListEntity.amount = +amount || null;
    wordListEntity.maxChoices = +maxChoices || null;
    wordListEntity.name = name;
    wordListEntity.optional = !!optional;
    wordListEntity.placeholder = placeholder || null;
    await wordListEntity.save();
    for (const { word, alwaysChoose } of words) {
      const entity = new WordListWordEntity();
      entity.word = word;
      entity.alwaysChoose = !!alwaysChoose;
      await entity.save();
    }
  }
}
