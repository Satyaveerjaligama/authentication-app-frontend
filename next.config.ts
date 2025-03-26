import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    USER_API: process.env.USER_API,
  },
};

export default nextConfig;
