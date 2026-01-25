import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    unoptimized: true, // Development için
  },
  // Strict mode for better error detection
  reactStrictMode: true,
};

export default nextConfig;
