import "server-only";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { JackboxJETContent, PromptType } from "../types/blather";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readDataFile<E>(filename: string): Promise<E> {
  return JSON.parse(
    await readFile(join(__dirname, "seed/jackbox_data", filename), "utf-8")
  );
}

(async function main() {
  const rawPrompts = await readDataFile<JackboxJETContent<PromptType>>("BlankyBlankPasswords.jet");
  const rawSentences = await readDataFile<JackboxJETContent<string>>("BlankyBlankSentenceStructures.jet");
  const rawWordLists = await readDataFile<JackboxJETContent<string>>("BlankyBlankWordLists.jet");
})();
