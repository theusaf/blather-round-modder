import { getPrismaClient } from "../../lib/app/prisma_connection.js";
import {
  PromptType,
  SentenceStructureType,
  WordListType,
} from "../../lib/blather_types.js";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)),
  jackboxDataDir = join(__dirname, "jackbox_data");

export interface JackboxJET<E> {
  content: E[];
}

export interface JackboxJET2<E> {
  fields: E[];
}

async function main() {
  const prisma = getPrismaClient(),
    jackboxPrompts: JackboxJET<PromptType> = JSON.parse(
      await readFile(join(jackboxDataDir, "BlankyBlankPasswords.jet"), "utf-8"),
    ),
    jackboxSentences: JackboxJET<SentenceStructureType> = JSON.parse(
      await readFile(
        join(jackboxDataDir, "BlankyBlankSentenceStructures.jet"),
        "utf-8",
      ),
    ),
    jackboxWordLists: JackboxJET<WordListType> = JSON.parse(
      await readFile(join(jackboxDataDir, "BlankyBlankWordLists.jet"), "utf-8"),
    ),
    // check if the user already exists
    user = await prisma.user.findUnique({
      where: { username: "jackbox" },
    });
  if (user) {
    console.log("Jackbox user already exists, skipping seed.");
    return;
  }

  await prisma.user.create({
    data: {
      username: "jackbox",
      email: "null@example.com",
      emailVerified: false,
      password: "",
      salt: "",
      project: {
        create: {
          name: "BlankyBlank Main",
          description: "The default project imported from Jackbox Games.",
          public: true,
          prompt: {
            create: jackboxPrompts.content.map((prompt) => {
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

              return {
                category,
                difficulty,
                subcategory: subcategory || null,
                us: !!us,
                password,
                prompt_forbidden_word: {
                  create: forbiddenWords.map((word) => ({ value: word })),
                },
                prompt_tailored_word: {
                  create: tailoredWords.map(({ word, list }) => ({
                    word,
                    list,
                  })),
                },
                prompt_alternate_spelling: {
                  create: alternateSpellings.map((word) => ({ value: word })),
                },
              };
            }),
          },
          sentence_structure: {
            create: jackboxSentences.content.map((sentence) => {
              const { category, structures } = sentence;
              return {
                category,
                sentence_structure_structure: {
                  create: structures.map((word) => ({ value: word })),
                },
              };
            }),
          },
          word_list: {
            create: jackboxWordLists.content.map((wordList) => {
              const { amount, maxChoices, name, optional, placeholder, words } =
                wordList;
              return {
                amount: +amount || null,
                maxChoices: +maxChoices || null,
                name,
                optional: !!optional,
                placeholder: placeholder || null,
                word_list_word: {
                  create: words.map(({ word, alwaysChoose }) => ({
                    word,
                    alwaysChoose: !!alwaysChoose,
                  })),
                },
              };
            }),
          },
        },
      },
    },
  });
  prisma.$disconnect();
}
main();
