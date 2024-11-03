import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**.com",
        port: ''
      },
      {
        protocol: 'http',
        hostname: "**.com",
        port: ''
      },
      {
        protocol: 'https',
        hostname: "cdn.sanity.io",
        port: ''
      },
    ]
  },
  experimental: {
    ppr: "incremental",
    after: true,
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right"
  },
};

export default nextConfig;
