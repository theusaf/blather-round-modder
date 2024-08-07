import type { MetadataRoute } from "next";
import { generateSitemaps } from "./(main)/projects/sitemap";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const projectMaps = await generateSitemaps();
	return {
		rules: [
			{
				userAgent: "*",
				allow: ["/"],
			},
		],
		sitemap: [
			"https://blather-mod.theusaf.org/sitemap.xml",
			...projectMaps.map(
				(projectMap) =>
					`https://blather-mod.theusaf.org/projects/${projectMap.id}.xml`,
			),
		],
	};
}
