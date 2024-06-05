import "server-only";
import Project from "../database/models/project";

/**
 * Retrieves the base jackbox project.
 *
 * @returns The base project.
 */
export async function getBaseProject() {
  return (
    await Project.findAll({
      limit: 1,
      where: {
        ownerId: "jackbox",
      },
    })
  )[0];
}
