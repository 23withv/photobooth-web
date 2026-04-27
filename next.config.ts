import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*local-origin.dev", "192.168."],
};

export default nextConfig;
