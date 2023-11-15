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
      filters.skip = 1;
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
    prisma = getPrismaClient(),
    results: project[] = [],
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

export type FullProject = Prisma.projectGetPayload<{
  include: {
    prompt: {
      include: {
        prompt_alternate_spelling: true;
        prompt_forbidden_word: true;
        prompt_tailored_word: true;
      };
    };
    sentence_structure: {
      include: {
        sentence_structure_structure: true;
      };
    };
    word_list: {
      include: {
        word_list_word: true;
      };
    };
  };
}>;

export async function getProject<T extends project = project>(
  id: number,
  includeAll = false,
): Promise<T | null> {
  const prisma = getPrismaClient(),
    options: Prisma.projectFindUniqueArgs = { where: { id: id } };

  if (includeAll) {
    options.include = {
      prompt: {
        include: {
          prompt_alternate_spelling: true,
          prompt_forbidden_word: true,
          prompt_tailored_word: true,
        },
      },
      sentence_structure: {
        include: {
          sentence_structure_structure: true,
        },
      },
      word_list: {
        include: {
          word_list_word: true,
        },
      },
    };
  }

  const project = (await prisma.project.findUnique(options)) as T;
  if (project) {
    if (project.public) {
      return project;
    } else {
      const user = await getCurrentUser();
      if (user && user.username === project.ownerUsername) {
        return project;
      }
    }
  }
  return null;
}
