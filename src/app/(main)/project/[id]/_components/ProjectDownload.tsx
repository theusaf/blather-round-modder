"use client";
import { ProjectType } from "@/lib/types/project";
import { useState } from "react";
import { ZipWriter, BlobWriter, TextReader } from "@zip.js/zip.js";
import { FieldType } from "@/lib/types/blather";
import CenteredModal from "@/lib/components/CenteredModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function stringify(obj: any, indent: number = 1) {
  return JSON.stringify(obj, null, indent);
}

function addFile(
  writer: ZipWriter<Blob>,
  path: string,
  content: Record<string, unknown>,
  indent?: number,
) {
  const text = stringify(content, indent);
  return writer.add(path, new TextReader(text));
}

export function ProjectDownload({ project }: { project: ProjectType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [blobLink, setBlobLink] = useState<string | null>(null);

  async function downloadProject() {
    setModalOpen(true);

    // Create a new zip file
    const fileWriter = new BlobWriter("application/zip");
    const writer = new ZipWriter(fileWriter);

    const manifest = {
      id: "Main",
      name: project.name,
      types: ["BlankyBlankPasswords"],
    };
    await addFile(writer, "manifest.jet", manifest, 4);
    await addFile(writer, "BlankyBlankPasswords.jet", {
      content: project.prompts,
    });
    await addFile(writer, "BlankyBlankSentenceStructures.jet", {
      content: project.sentenceStructures,
    });
    await addFile(writer, "BlankyBlankWordLists.jet", {
      content: project.wordLists,
    });

    for (const prompt of project.prompts) {
      const fields: FieldType[] = [];
      fields.push({ t: "S", v: prompt.password, n: "Password" });
      fields.push({ t: "S", v: prompt.category, n: "Category" });
      if (prompt.subcategory) {
        fields.push({ t: "S", v: prompt.subcategory, n: "Subcategory" });
      }
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
      await addFile(writer, `BlankyBlankPasswords/${prompt.id}/data.jet`, {
        fields,
      });
    }

    for (const sentenceStructure of project.sentenceStructures) {
      const fields: FieldType[] = [];
      fields.push({ t: "S", v: sentenceStructure.category, n: "Category" });
      fields.push({
        t: "S",
        v: sentenceStructure.structures.join("|"),
        n: "Structures",
      });
      await addFile(
        writer,
        `BlankyBlankSentenceStructures/${sentenceStructure.id}/data.jet`,
        { fields },
      );
    }

    for (const wordList of project.wordLists) {
      const fields: FieldType[] = [];
      fields.push({ t: "S", v: wordList.name, n: "Name" });
      fields.push({ t: "B", v: `${wordList.optional}`, n: "Optional" });
      fields.push({ t: "S", v: wordList.amount, n: "Amount" });
      fields.push({ t: "S", v: wordList.maxChoices, n: "MaxChoices" });
      fields.push({ t: "S", v: wordList.placeholder, n: "Placeholder" });
      await addFile(writer, `BlankyBlankWordLists/${wordList.id}/data.jet`, {
        fields,
      });
    }

    const blob = await writer.close();
    const url = URL.createObjectURL(blob);
    setBlobLink(url);
  }

  return (
    <>
      <button
        className="p-2 rounded-md bg-emerald-700 text-white"
        onClick={downloadProject}
      >
        Download
      </button>
      <CenteredModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (blobLink) {
            URL.revokeObjectURL(blobLink);
          }
          setBlobLink(null);
        }}
      >
        <div className="flex justify-center text-center">
          {blobLink ? (
            <a href={blobLink} download="project.zip">
              <p className="text-lg font-semibold">Download is ready!</p>
              <button className="p-2 rounded-md bg-emerald-700 text-white">
                Download Project
              </button>
            </a>
          ) : (
            <div>
              <p>Zipping project...</p>
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-8 h-8 text-blue-600 animate-spin mt-2"
              />
            </div>
          )}
        </div>
        <hr className="my-2 border-black" />
        <div className="p-4">
          <h3 className="text-xl font-bold">How to Install</h3>
          <ol className="list-decimal list-inside font-sans">
            <li>Extract the files from the zip somewhere on your computer.</li>
            <li>
              In a file explorer, navigate to the Blather &apos;Round game
              files.
              <ul className="list-disc list-inside ml-4">
                <li>
                  The path might look something like{" "}
                  <code>(pack files)/games/BlankyBlank/content/</code>
                </li>
                <li>
                  On Steam, you can access this folder through the context menu,
                  selecting <strong>Manage &gt; Browse Local Files</strong>.
                </li>
              </ul>
            </li>
            <li>
              Make a backup of the existing content in case you want to restore
              the default gameplay.
            </li>
            <li>
              Clear the content and move the new project files into the folder.
            </li>
            <li>Have fun!</li>
          </ol>
        </div>
      </CenteredModal>
    </>
  );
}
