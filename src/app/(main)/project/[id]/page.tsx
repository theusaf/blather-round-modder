import "server-only";
import Link from "next/link";
import Project from "@/lib/database/models/project";
import SectionCard from "@/lib/components/SectionCard";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await Project.findById(params.id);
  if (!project) return notFound();

  return (
    <main className="p-2">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <div className="flex gap-2 h-min">
          <Link href={`/project/${params.id}/edit`}>
            <button className="p-2 rounded-md bg-emerald-700 text-white">
              Edit
            </button>
          </Link>
          <Link href={`/project/${params.id}/remix`}>
            <button className="p-2 rounded-md bg-emerald-700 text-white">
              Remix
            </button>
          </Link>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <SectionCard>
            <h2 className="text-xl font-bold">Sentence Structures</h2>
            <div className="flex flex-col gap-2">
              {project.sentenceStructures.map((sentenceStructure) => (
                <div
                  key={sentenceStructure.id}
                  className="border-slate-300 border-2 rounded-md p-2"
                >
                  <h3 className="text-lg font-semibold">
                    Category: {sentenceStructure.category}
                  </h3>
                  <ul className="list-inside list-disc">
                    {sentenceStructure.structures.map((structure, i) => (
                      <li key={i}>{structure}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard>
            <h2 className="text-xl font-bold">Word Lists</h2>
            <div className="flex flex-col gap-2">
              {project.wordLists.map((wordList) => (
                <div
                  key={wordList.id}
                  className="border-slate-300 border-2 rounded-md p-2"
                >
                  <h3 className="text-lg font-semibold">{wordList.name}</h3>
                  <details>
                    <summary>View Words</summary>
                    <ul className="list-inside list-disc">
                      {wordList.words.map((word, i) => (
                        <li key={i}>{word.word}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <SectionCard className="flex-1">
          <h2 className="text-xl font-bold">Prompts</h2>
          <div className="flex flex-col gap-2">
            {project.prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="border-slate-300 border-2 rounded-md p-2"
              >
                <h3 className="text-lg font-semibold">{prompt.password}</h3>
                <p>Difficulty: {prompt.difficulty}</p>
                <p>Forbidden Words: {prompt.forbiddenWords.join(", ")}</p>
                <p>Category: {prompt.category}</p>
                <p>US-Centric: {prompt.us ? "Yes" : "No"}</p>
                <details>
                  <summary>View Tailored Words</summary>
                  <ul className="list-inside list-disc">
                    {prompt.tailoredWords.map((tailoredWord, i) => (
                      <li key={i}>
                        {tailoredWord.list} - {tailoredWord.word}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
