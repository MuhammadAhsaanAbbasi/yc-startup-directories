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
    ]
  }
};

export default nextConfig;
