/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

module.exports = nextConfig;
