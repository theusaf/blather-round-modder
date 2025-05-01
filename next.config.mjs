import packageData from "./package.json" with { type: "json" };

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "25mb",
		},
	},
	env: {
		version: packageData.version,
	},
};

export default nextConfig;
