import "server-only";
import Project from "@/lib/database/models/project";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await Project.findAll({
    limit: 25,
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-2">Projects</h1>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-[18rem] h-[16rem] rounded-xl p-4 border-2 border-slate-400 flex flex-col"
          >
            <div>
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p>{project.ownerId}</p>
            </div>
            <hr />
            <p className="flex-1">{project.description}</p>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Link href={`/project/${project.id}`}>
                  <button className="bg-emerald-700 text-white rounded-md p-2">
                    View
                  </button>
                </Link>
                <Link href={`/project/${project.id}/remix`}>
                  <button className="bg-emerald-700 text-white rounded-md p-2">
                    Remix
                  </button>
                </Link>
              </div>
              <div className="flex items-center">
                <span>Prompts: {project.prompts.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-center">
        {/* TODO: Add load functionality to this */}
        <button className="rounded-md bg-emerald-700 text-white p-2">
          Load More
        </button>
      </div>
    </main>
  );
}
