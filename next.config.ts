import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't walk up to the user home
  // directory (see the package-lock warning during `next build`).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
