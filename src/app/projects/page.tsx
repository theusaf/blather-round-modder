import ProjectCard from "../../components/projects/card";
import ProjectLoadButton from "../../components/projects/load_button";
import ProjectList from "../../components/projects/project_list";
import { getProjects } from "../../lib/app/api/projects";
import React from "react";

export default async function ProjectHomePage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const projects = await getProjects(searchParams);
  return (
    <main className="w-full flex-1 px-1">
      <h1 className="text-2xl mb-2">Projects</h1>
      <div id="filters"></div>
      <section id="projects" className="flex flex-row">
        {projects.map((project) => ProjectCard(project))}
        <ProjectList cursor={projects[projects.length - 1].id} />
      </section>
      <hr className="my-2" />
      <ProjectLoadButton />
    </main>
  );
}
