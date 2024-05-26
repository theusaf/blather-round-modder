import "server-only";
import Project from "../database/models/project";

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
