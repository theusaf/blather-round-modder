import { ProjectType } from "@/lib/types/project";
import ProjectLoadHandler from "./_components/ProjectLoadHandler";
import NavBar from "./_components/NavBar";
import { ReactNode } from "react";
import Project from "@/lib/database/models/project";
import { notFound } from "next/navigation";
import { getUserSession } from "@/lib/util/auth";
import Link from "next/link";

export default async function EditProjectPage({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const userDetails = await getUserSession();
  if (!userDetails) {
    return (
      <p>
        You must be{" "}
        <Link href="/login" className="underline">
          logged in
        </Link>{" "}
        to edit a project.
      </p>
    );
  }
  const { id } = params;
  const project = await Project.findById(id);
  if (!project) return notFound();
  if (project.ownerId !== userDetails.sub) {
    return (
      <div className="p-2">
        <p className="font-extrabold">
          You do not have permission to edit this project.
        </p>
        <Link href={`/project/${id}`}>
          <button className="p-2 rounded-md bg-emerald-700 text-white">
            Go to Project
          </button>
        </Link>
      </div>
    );
  }
  const initialProject: ProjectType = {
    id: id,
    likes: project.likes,
    name: project.name,
    description: project.description,
    public: project.public,
    ownerId: project.ownerId,
    prompts: project.prompts,
    sentenceStructures: project.sentenceStructures,
    wordLists: project.wordLists,
  };
  return (
    <ProjectLoadHandler project={initialProject}>
      <div className="flex flex-col h-full">
        <NavBar />
        <div className="flex-1">{children}</div>
      </div>
    </ProjectLoadHandler>
  );
}
