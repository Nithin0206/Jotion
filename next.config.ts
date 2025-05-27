import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.edgestore.dev"],
  },
  devIndicators: false
};

export default nextConfig;
