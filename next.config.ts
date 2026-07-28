import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 180,
  experimental: {
    staticGenerationMaxConcurrency: 4,
    staticGenerationRetryCount: 1
  }
};

export default nextConfig;
