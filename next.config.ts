import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded to Sanity are served from its CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  outputFileTracingRoot: path.resolve(process.cwd()),
};

export default nextConfig;
