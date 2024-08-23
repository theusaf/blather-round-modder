import Project from "@/lib/database/models/project";
import type { ProjectListingAPIOptions } from "@/lib/types/api";
import type { QueryOptions } from "@/lib/types/database";
import type { ProjectType, ShallowProjectType } from "@/lib/types/project";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const options: ProjectListingAPIOptions = {
		limit: Number.parseInt(searchParams.get("limit") ?? "10") || 10,
		cursor: Number.parseInt(searchParams.get("cursor") ?? "0") || 0,
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
			version: p.version,
			name: p.name,
			ownerId: p.ownerId,
			description: p.description,
			promptCount: p.prompts.length,
		})),
	);
}
