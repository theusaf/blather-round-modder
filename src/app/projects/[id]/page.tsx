import { DangerButton, PrimaryButton } from "@/components/button";
import { FullProject, getProject } from "@/lib/app/api/projects";
import { getCurrentUser } from "@/lib/app/auth";
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
        <div className="flex-1 flex flex-col items-end">
          <div className="flex flex-row">{buttons}</div>
        </div>
      </div>
    </main>
  );
}
