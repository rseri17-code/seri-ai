import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 180,
  async headers() {
    // `next start` does not read vercel.json. These match the deployment headers.
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'"
          }
        ]
      }
    ];
  },
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
