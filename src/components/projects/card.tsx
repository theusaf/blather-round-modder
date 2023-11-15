import { project } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { DefaultButton } from "../button";

export default function ProjectCard(project: project) {
  return (
    <div
      key={project.id}
      className="bg-neutral-300 flex-1 p-2 rounded shadow-md max-w-xs lg:max-w-md"
    >
      <div className="h-40">
        <h2 className="text-lg font-bold">{project.name}</h2>
        <p>
          by{" "}
          <Link href={`/user/${project.ownerUsername}`} className="underline">
            {project.ownerUsername}
          </Link>
        </p>
        <p className="text-zinc-700">{project.description}</p>
      </div>
      <div className="mb-1">
        <Link href={`/projects/${project.id}`}>
          <DefaultButton>View</DefaultButton>
        </Link>
        <Link href={`/projects/${project.id}/remix`}>
          <DefaultButton icon="arrows-spin">Remix</DefaultButton>
        </Link>
        <Link href={`/projects/${project.id}/download`}>
          <DefaultButton icon="download">Download</DefaultButton>
        </Link>
      </div>
    </div>
  );
}
