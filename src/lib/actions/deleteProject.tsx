"use server";

import { revalidatePath } from "next/cache";
import Project from "../database/models/project";
import { getUserSession } from "../util/auth";
import revalidateProjectPaths from "../util/revalidateProjectPaths";
import { redirect } from "next/navigation";

/**
 * Deletes a project from the database.
 *
 * @param id The id of the project to delete.
 */
export async function deleteProject(id: string) {
	const userSession = await getUserSession();
	if (!userSession) return;
	if (typeof id !== "string" || !id) return;
	const project = await Project.findById(id);
	if (!project) return;
	if (project.ownerId !== userSession.sub) return;
	await project.delete();
	revalidateProjectPaths(userSession.sub);
	revalidatePath(`/project/${id}`);
	revalidatePath(`/project/${id}/edit`);
	redirect("/");
}
