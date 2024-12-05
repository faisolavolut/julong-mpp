import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/proxy/:path*', // Semua permintaan ke /api/proxy/*
  //       destination: 'http://localhost:3001/:path*', // Proxy ke backend (port 3001)
  //     },
  //   ];
  // },
};

export default nextConfig;
