import Project from "@/lib/database/models/project";
import { ProjectListingAPIOptions } from "@/lib/types/api";
import { QueryOptions } from "@/lib/types/database";
import { ProjectType, ShallowProjectType } from "@/lib/types/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const options: ProjectListingAPIOptions = {
    limit: parseInt(searchParams.get("limit") ?? "10") || 10,
    cursor: parseInt(searchParams.get("cursor") ?? "0") || 0,
    userId: searchParams.get("userId") ?? "",
  };

  const queryOptions: QueryOptions<ProjectType> = {
    cursor: options.cursor,
    limit: options.limit,
    where: {},
  };

  if (options.userId) {
    queryOptions.where!.ownerId = options.userId;
  } else {
    queryOptions.where!.public = true;
  }

  const projects = await Project.findAll(queryOptions);
  return NextResponse.json<ShallowProjectType[]>(
    projects.map((p) => ({
      id: p.id,
      likes: p.likes,
      public: p.public,
      name: p.name,
      ownerId: p.ownerId,
      description: p.description,
      promptCount: p.prompts.length,
    })),
  );
}
