import { ProjectType } from "@/lib/types/project";
import ProjectLoadHandler from "./_components/ProjectLoadHandler";
import NavBar from "./_components/NavBar";
import { ReactNode } from "react";
import Project from "@/lib/database/models/project";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const { id } = params;
  const project = await Project.findById(id);
  if (!project) return notFound();
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
