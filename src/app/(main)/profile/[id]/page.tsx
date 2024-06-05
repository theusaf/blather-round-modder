import "server-only";
import ProjectListing from "../../_components/ProjectListing";
import { ProjectType, ShallowProjectType } from "@/lib/types/project";
import Project from "@/lib/database/models/project";
import { ResolvingMetadata } from "next";
import { getUserSession } from "@/lib/util/auth";
import { QueryOptions } from "@/lib/types/database";

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata,
) {
  const userDetails = await getUserSession();
  return {
    title: `${(await parent).title?.absolute} - ${userDetails?.sub}'s Profile`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const limit = 10;
  const userDetails = await getUserSession();
  const options: QueryOptions<ProjectType> = {
    limit,
    where: {
      ownerId: params.id,
    },
  };
  if (userDetails?.sub !== params.id) {
    options.where!.public = true;
  }

  const projects = await Project.findAll(options);

  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold">
        <span>{params.id}</span>&apos;s Projects
      </h1>
      <ProjectListing
        options={{
          limit,
          cursor: Math.max(projects.length, limit),
          userId: params.id,
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
