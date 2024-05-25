import "server-only";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  JackboxJETContent,
  PromptType,
  SentenceStructureType,
  WordListType,
} from "../types/blather";
import User from "./models/user";
import Project from "./models/project";
import Prompt from "./models/prompt";
import SentenceStructure from "./models/setenceStructure";
import WordList from "./models/wordList";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readDataFile<E>(filename: string): Promise<E> {
  return JSON.parse(
    await readFile(join(__dirname, "seed/jackbox_data", filename), "utf-8"),
  );
}

(async function main() {
  const rawPrompts = await readDataFile<JackboxJETContent<PromptType>>(
    "BlankyBlankPasswords.jet",
  );
  const rawSentences = await readDataFile<
    JackboxJETContent<SentenceStructureType>
  >("BlankyBlankSentenceStructures.jet");
  const rawWordLists = await readDataFile<JackboxJETContent<WordListType>>(
    "BlankyBlankWordLists.jet",
  );

  const exisingUser = await User.findById("jackbox");
  if (exisingUser) {
    console.log("User already exists - Assuming data is already seeded");
    return;
  }

  const user = new User({
    password: "",
    username: "jackbox",
  });
  const project = new Project({
    ownerId: "jackbox",
    public: true,
    likes: 0,
    name: "Blanky Blank Default",
    description: "The content from the Jackbox game Blather Round",
    wordLists: rawWordLists.content,
    prompts: rawPrompts.content,
    sentenceStructures: rawSentences.content,
  });

  await user.save();
  await project.save();
})();
