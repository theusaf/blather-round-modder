import "server-only";
import Project from "@/lib/database/models/project";
import ProjectListing from "../_components/ProjectListing";
import { ShallowProjectType } from "@/lib/types/project";

export default async function ProjectsPage() {
  const limit = 10;
  const projects = await Project.findAll({
    limit,
    where: {
      public: true,
    },
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-2">Projects</h1>
      <ProjectListing
        options={{
          limit,
          cursor: Math.max(projects.length, limit),
        }}
        projects={projects.map((p) => {
          const project: ShallowProjectType = {
            id: p.id,
            likes: p.likes,
            public: p.public,
            name: p.name,
            ownerId: p.ownerId,
            description: p.description,
            promptCount: p.prompts.length,
          };
          return project;
        })}
      />
    </main>
  );
}
