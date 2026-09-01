import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 180,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/background",
        permanent: true
      }
    ];
  },
  experimental: {
    staticGenerationMaxConcurrency: 4,
    staticGenerationRetryCount: 1
  }
};

export default nextConfig;
