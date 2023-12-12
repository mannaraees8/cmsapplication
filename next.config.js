/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["thumbs.dreamstime.com"],
  },
};

module.exports = nextConfig;
