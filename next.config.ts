import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'campussutra.com', // Replace with your actual domain
        pathname: '**',       // Allow all paths on this domain
      },
    ],
  },
};

export default nextConfig;
