"use server";

import { revalidatePath } from "next/cache";
import Project from "../database/models/project";
import type { ProjectType } from "../types/project";
import { getUserSession } from "../util/auth";
import revalidateProjectPaths from "../util/revalidateProjectPaths";
import { createSession } from "./login";

/**
 * Saves a project to the database.
 *
 * @param project The project to save.
 */
export async function saveProject(project: ProjectType) {
	const userDetails = await getUserSession();
	if (!userDetails) return;
	if (!project) return;
	if (typeof project !== "object") return;
	const id = project.id;
	const existing = await Project.findById(id ?? "null");
	if (!existing) return;
	if (existing.ownerId !== userDetails.sub) return;

	// recreate the session after a certain amount of time has passed
	const now = Date.now() / 1000;
	const issuedAt = userDetails.iat ?? 0;
	const expirationTime = userDetails.exp ?? 0;
	const timeLeft = expirationTime - now;
	const refreshThreshold = 3 * 24 * 60 * 60; // 3 days
	// issued at comparison to avoid accidentally refreshing token too often
	if (timeLeft < refreshThreshold && now - issuedAt > 60 * 60) {
		await createSession({ sub: userDetails.sub });
	}

	// Likely okay to save project
	Object.assign(existing, {
		public: project.public,
		name: project.name,
		version: existing.version + 1,
		description: project.description,
		prompts: project.prompts,
		sentenceStructures: project.sentenceStructures,
		wordLists: project.wordLists,
	});
	await existing.save();
	revalidatePath(`/project/${id}`);
	revalidatePath(`/project/${id}/edit`);
	revalidateProjectPaths(userDetails.sub);
}
