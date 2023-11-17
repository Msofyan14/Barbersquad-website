/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
  },
};

module.exports = nextConfig;
