import { ProjectEntity } from "@/database/entity/system/Project.js";
import JSZip from "jszip";
import {
  Category,
  Difficulty,
  ListString,
  FieldType,
  PromptType,
  SentenceStructureType,
  WordListType,
} from "../blather_types";

function stringify(obj: any, indent: number = 1) {
  return JSON.stringify(obj, null, indent);
}

export async function exportProject(project: ProjectEntity): Promise<Blob> {
  const zipper = new JSZip();
  const manifest = {
    id: "Main",
    name: project.name,
    types: ["BlankyBlankPasswords"],
  };

  zipper.file("manifest.jet", stringify(manifest, 4));

  const promptEntities = project.prompts,
    sentenceStructureEntities = project.sentenceStructures,
    wordListEntities = project.wordLists;

  let objectId = 70571; // the lowest number listed in jackbox games. unsure if this matters or not.

  const prompts: PromptType[] = promptEntities.map((entity) => {
    const prompt: PromptType = {
      id: `${objectId++}`,
      category: entity.category as Category,
      difficulty: entity.difficulty as Difficulty,
      password: entity.password,
      subcategory: entity.subcategory ?? "",
      alternateSpellings: entity.alternateSpellings.map((e) => e.value),
      forbiddenWords: entity.forbiddenWords.map((e) => e.value),
      tailoredWords: entity.tailoredWords.map((e) => ({
        list: e.list as ListString,
        word: e.word,
      })),
      us: entity.us,
    };
    return prompt;
  });

  const sentenceStructures = sentenceStructureEntities.map((entity) => {
    const sentenceStructure: SentenceStructureType = {
      id: `${objectId++}`,
      category: entity.category as Category,
      structures: entity.structures.map((e) => e.value),
    };
    return sentenceStructure;
  });

  const wordLists = wordListEntities.map((entity) => {
    const wordList: WordListType = {
      id: `${objectId++}`,
      amount: entity.amount ? `${entity.amount}` : "",
      maxChoices: entity.maxChoices ? `${entity.maxChoices}` : "",
      name: entity.name,
      optional: entity.optional,
      placeholder: entity.placeholder ?? "",
      words: entity.words.map((e) => ({
        alwaysChoose: e.alwaysChoose,
        word: e.word,
      })),
    };
    return wordList;
  });

  const promptContent = { content: prompts };
  const sentenceStructureContent = { content: sentenceStructures };
  const wordListContent = { content: wordLists };

  zipper.file("BlankyBlankPasswords.jet", stringify(promptContent));
  zipper.file(
    "BlankyBlankSentenceStructures.jet",
    stringify(sentenceStructureContent),
  );
  zipper.file("BlankyBlankWordLists.jet", stringify(wordListContent));

  const passwordFolder = zipper.folder("BlankyBlankPasswords");
  for (const prompt of prompts) {
    const folder = passwordFolder!.folder(prompt.id);
    const fields: FieldType[] = [];
    fields.push({ t: "S", v: prompt.password, n: "Password" });
    fields.push({ t: "S", v: prompt.category, n: "Category" });
    if (prompt.subcategory)
      fields.push({ t: "S", v: prompt.subcategory, n: "Subcategory" });
    fields.push({ t: "S", v: prompt.difficulty, n: "Difficulty" });
    fields.push({
      t: "S",
      v: prompt.forbiddenWords.join("|"),
      n: "ForbiddenWords",
    });
    fields.push({
      t: "S",
      v: prompt.alternateSpellings.join("|"),
      n: "AlternateSpellings",
    });
    folder!.file("data.jet", stringify({ fields }));
  }

  const sentenceStructureFolder = zipper.folder(
    "BlankyBlankSentenceStructures",
  );
  for (const sentenceStructure of sentenceStructures) {
    const folder = sentenceStructureFolder!.folder(sentenceStructure.id);
    const fields: FieldType[] = [];
    fields.push({ t: "S", v: sentenceStructure.category, n: "Category" });
    fields.push({
      t: "S",
      v: sentenceStructure.structures.join("|"),
      n: "Structures",
    });
    folder!.file("data.jet", stringify({ fields }));
  }

  const wordListFolder = zipper.folder("BlankyBlankWordLists");
  for (const wordList of wordLists) {
    const folder = wordListFolder!.folder(wordList.id);
    const fields: FieldType[] = [];
    fields.push({ t: "S", v: wordList.name, n: "Name" });
    fields.push({ t: "B", v: `${wordList.optional}`, n: "Optional" });
    fields.push({ t: "S", v: wordList.amount, n: "Amount" });
    fields.push({ t: "S", v: wordList.maxChoices, n: "MaxChoices" });
    fields.push({ t: "S", v: wordList.placeholder, n: "Placeholder" });
    folder!.file("data.jet", stringify({ fields }));
  }

  return await zipper.generateAsync({ type: "blob" });
}
