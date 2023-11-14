import { project } from "@prisma/client";
import Link from "next/link";
import React from "react";
import FontAwesomeIcon from "../fontawesome";

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
          <button className="bg-neutral-500 p-2 rounded text-neutral-100 mr-2">
            View
          </button>
        </Link>
        <Link href={`/projects/${project.id}/remix`}>
          <button className="bg-neutral-500 p-2 rounded text-neutral-100 mr-2">
            <FontAwesomeIcon
              icon="arrows-spin"
              className="mr-1"
            ></FontAwesomeIcon>
            Remix
          </button>
        </Link>
        <Link href={`/projects/${project.id}/download`}>
          <button className="bg-neutral-500 p-2 rounded text-neutral-100">
            <FontAwesomeIcon icon="download" className="mr-1"></FontAwesomeIcon>
            Download
          </button>
        </Link>
      </div>
    </div>
  );
}
