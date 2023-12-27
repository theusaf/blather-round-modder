import { prompt } from "@prisma/client";
import { DangerButton, PrimaryButton } from "../../../components/button";
import { FullProject, getProject } from "../../../lib/app/api/projects";
import { getCurrentUser } from "../../../lib/app/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject<FullProject>(+params.id, true),
    user = await getCurrentUser();
  if (!project) return notFound();

  const buttons = [
    <Link href={`/projects/${params.id}/remix`} key="remix">
      <PrimaryButton icon="arrows-spin">Remix</PrimaryButton>
    </Link>,
    <Link href={`/projects/${params.id}/download`} key="download">
      <PrimaryButton icon="download">Download</PrimaryButton>
    </Link>,
  ];

  if (user?.username === project.ownerUsername) {
    buttons.splice(
      0,
      0,
      <Link href={`/projects/${params.id}/edit`} key="edit">
        <PrimaryButton icon="pen-to-square">Edit</PrimaryButton>
      </Link>,
    );
    buttons.push(
      <DangerButton icon="trash" key="delete">
        Delete
      </DangerButton>,
    );
  }

  return (
    <main>
      <div className="flex flex-row">
        <h1 className="text-2xl">{project.name}</h1>
        <div className="flex-1 flex-col items-end hidden sm:flex">
          <div className="flex flex-row">{buttons}</div>
        </div>
      </div>
      <p role="definition" className="mb-6">
        {project.description}
      </p>
      <section className="border-2 border-slate-500 rounded p-2">
        <h2 className="text-xl">Prompts</h2>
        <div className="flex flex-wrap max-h-80 overflow-auto">
          {project.prompt.map((prompt) => PromptCard(prompt))}
        </div>
      </section>
      <div className="sm:hidden block mt-2">{buttons}</div>
    </main>
  );
}

function PromptCard(prompt: prompt) {
  let cardScaffold: ReturnType<typeof PromptCardScaffold>;
  switch (prompt.category) {
    case "place":
      cardScaffold = (
        <PromptCardScaffold prompt={prompt} className="border-green-600" />
      );
      break;
    case "person":
      cardScaffold = (
        <PromptCardScaffold prompt={prompt} className="border-red-600" />
      );
      break;
    default:
      cardScaffold = (
        <PromptCardScaffold prompt={prompt} className="border-blue-600" />
      );
  }
  return <React.Fragment key={prompt.id}>{cardScaffold}</React.Fragment>;
}

function PromptCardScaffold({
  className,
  prompt,
}: {
  className: string;
  children?: React.ReactNode;
  prompt: prompt;
}) {
  return (
    <span className={`border-2 rounded p-2 m-2 ${className}`}>
      {prompt.password}
    </span>
  );
}
