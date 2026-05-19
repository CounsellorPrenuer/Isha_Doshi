import type { NextConfig } from "next";

const repoBasePath = "/Isha_Doshi";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? repoBasePath : undefined,
  assetPrefix: process.env.NODE_ENV === "production" ? repoBasePath : undefined,
};

export default nextConfig;
