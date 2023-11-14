import ProjectCard from "../../components/projects/card";
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
      <h1 className="text-2xl mb-2">Projects!</h1>
      <div id="filters"></div>
      <section id="projects" className="flex flex-row">
        {projects.map((project) => ProjectCard(project))}
      </section>
    </main>
  );
}
