import Project from "@/lib/database/models/project";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
	const projectCount = (
		await Project.findAll({
			where: {
				public: true,
			},
		})
	).length;
	const sitemaps = [];
	for (let i = 0; i < Math.ceil(projectCount / 50000); i++) {
		sitemaps.push({ id: i + 1 });
	}
	return sitemaps;
}

export default async function sitemap({
	id,
}: { id: number }): Promise<MetadataRoute.Sitemap> {
	const start = (id - 1) * 50000;
	const projects = await Project.findAll({
		cursor: start,
		limit: 50000,
		where: {
			public: true,
		},
	});
	return projects.map((project) => ({
		url: `https://blather-mod.theusaf.org/project/${project.id}`,
	}));
}
