import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src"],
    images: {
      domains: ["picsum.photos"],
    },
  },
};

export default nextConfig;
