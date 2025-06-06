import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ["three"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "vemdhfxcbyohvturezlp.supabase.co",
			},
		],
	},
};

export default nextConfig;
