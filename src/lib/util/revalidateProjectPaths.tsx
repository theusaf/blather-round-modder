import { revalidatePath } from "next/cache";

/**
 * Clears the cache for the project and profile pages.
 *
 * Used when a project is created or updated.
 *
 * @param username The username of the project owner.
 */
export default function revalidateProjectPaths(username: string) {
	revalidatePath("/projects");
	revalidatePath(`/profile/${encodeURIComponent(username)}`);
}
