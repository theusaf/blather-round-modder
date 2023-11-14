import { type project as ProjectEntity } from "@prisma/client";
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
import { getPrismaClient } from "../app/prisma_connection";

function stringify(obj: any, indent: number = 1) {
  return JSON.stringify(obj, null, indent);
}

export async function exportProject(project: ProjectEntity): Promise<Blob> {
  const prisma = getPrismaClient(),
    zipper = new JSZip(),
    manifest = {
      id: "Main",
      name: project.name,
      types: ["BlankyBlankPasswords"],
    };

  zipper.file("manifest.jet", stringify(manifest, 4));

  const promptEntities = await prisma.prompt.findMany({
      where: { projectId: project.id },
      include: {
        prompt_alternate_spelling: true,
        prompt_forbidden_word: true,
        prompt_tailored_word: true,
      },
    }),
    sentenceStructureEntities = await prisma.sentence_structure.findMany({
      where: { projectId: project.id },
      include: { sentence_structure_structure: true },
    }),
    wordListEntities = await prisma.word_list.findMany({
      where: { projectId: project.id },
      include: { word_list_word: true },
    });

  let objectId = 70571; // the lowest number listed in jackbox games. unsure if this matters or not.

  const prompts: PromptType[] = promptEntities.map((entity) => {
      const prompt: PromptType = {
        id: `${objectId++}`,
        category: entity.category as Category,
        difficulty: entity.difficulty as Difficulty,
        password: entity.password,
        subcategory: entity.subcategory ?? "",
        alternateSpellings: entity.prompt_alternate_spelling.map(
          (e) => e.value,
        ),
        forbiddenWords: entity.prompt_forbidden_word.map((e) => e.value),
        tailoredWords: entity.prompt_tailored_word.map((e) => ({
          list: e.list as ListString,
          word: e.word,
        })),
        us: entity.us,
      };
      return prompt;
    }),
    sentenceStructures = sentenceStructureEntities.map((entity) => {
      const sentenceStructure: SentenceStructureType = {
        id: `${objectId++}`,
        category: entity.category as Category,
        structures: entity.sentence_structure_structure.map((e) => e.value),
      };
      return sentenceStructure;
    }),
    wordLists = wordListEntities.map((entity) => {
      const wordList: WordListType = {
        id: `${objectId++}`,
        amount: entity.amount ? `${entity.amount}` : "",
        maxChoices: entity.maxChoices ? `${entity.maxChoices}` : "",
        name: entity.name,
        optional: entity.optional,
        placeholder: entity.placeholder ?? "",
        words: entity.word_list_word.map((e) => ({
          alwaysChoose: e.alwaysChoose,
          word: e.word,
        })),
      };
      return wordList;
    }),
    promptContent = { content: prompts },
    sentenceStructureContent = { content: sentenceStructures },
    wordListContent = { content: wordLists };

  zipper.file("BlankyBlankPasswords.jet", stringify(promptContent));
  zipper.file(
    "BlankyBlankSentenceStructures.jet",
    stringify(sentenceStructureContent),
  );
  zipper.file("BlankyBlankWordLists.jet", stringify(wordListContent));

  const passwordFolder = zipper.folder("BlankyBlankPasswords");
  for (const prompt of prompts) {
    const folder = passwordFolder!.folder(prompt.id),
      fields: FieldType[] = [];
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
    const folder = sentenceStructureFolder!.folder(sentenceStructure.id),
      fields: FieldType[] = [];
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
    const folder = wordListFolder!.folder(wordList.id),
      fields: FieldType[] = [];
    fields.push({ t: "S", v: wordList.name, n: "Name" });
    fields.push({ t: "B", v: `${wordList.optional}`, n: "Optional" });
    fields.push({ t: "S", v: wordList.amount, n: "Amount" });
    fields.push({ t: "S", v: wordList.maxChoices, n: "MaxChoices" });
    fields.push({ t: "S", v: wordList.placeholder, n: "Placeholder" });
    folder!.file("data.jet", stringify({ fields }));
  }

  return await zipper.generateAsync({ type: "blob" });
}
