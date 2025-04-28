import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: "pub-38d8465d1d7f412b8698373835947553.r2.dev",
        port: '', 
        pathname:'/bwanewsportal/**'
      }
    ]
  }
};

export default nextConfig;
