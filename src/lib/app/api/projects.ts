import { getCurrentUser } from "@/lib/app/auth";
import { getPrismaClient } from "@/lib/app/prisma_connection";
import { Prisma, project, user } from "@prisma/client";

const PAGE_SIZE = 10;

function getFilters(
  params: Record<string, string | undefined>,
  user: user | null,
) {
  const filters: Prisma.projectFindManyArgs = {
    orderBy: { lastUpdated: "desc" },
    take: PAGE_SIZE,
  };
  if (user) {
    filters.where = {
      OR: [{ public: true }, { ownerUsername: user.username }],
    };
  } else {
    filters.where = { public: true };
  }
  if (params.cursor) {
    const cursor = +params.cursor;
    if (Number.isInteger(cursor)) {
      filters.cursor = { id: cursor };
    }
  }
  if (params.order) {
    switch (params.order) {
      case "updated":
        filters.orderBy = { lastUpdated: "desc" };
        break;
      case "updated-asc":
        filters.orderBy = { lastUpdated: "asc" };
        break;
      case "likes":
        filters.orderBy = { likes: "desc" };
        break;
      case "likes-asc":
        filters.orderBy = { likes: "asc" };
        break;
    }
  }
  return filters;
}

function applySearch(projects: project[], search: string) {
  return projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase())
    );
  });
}

export async function getProjects(
  params: Record<string, string>,
): Promise<project[]> {
  const user = await getCurrentUser(),
    prisma = getPrismaClient();
  const results: project[] = [],
    filters = getFilters(params, user);

  while (results.length < PAGE_SIZE) {
    const projects = await prisma.project.findMany(filters);
    if (projects.length === 0) break;
    if (params.query) {
      results.push(...applySearch(projects, params.query));
    } else {
      results.push(...projects);
    }
    filters.cursor = { id: projects[projects.length - 1].id };
    filters.skip = 1;
  }
  return results;
}
