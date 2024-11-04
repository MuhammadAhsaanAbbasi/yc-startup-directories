import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
        port: ''
      },
      {
        protocol: 'http',
        hostname: "**.com",
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