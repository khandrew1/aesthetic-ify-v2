import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["[::1]", "127.0.0.1"],
	images: {
		remotePatterns: [
			new URL("https://i.scdn.co/image/**"),
			new URL("https://image-cdn-*.spotifycdn.com/image/**"),
		],
	},
};

export default nextConfig;
