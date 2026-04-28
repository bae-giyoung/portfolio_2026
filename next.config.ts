import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: "/lab/:path+",
        destination: `${process.env.PRIVATE_PLAY_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;