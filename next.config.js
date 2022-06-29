/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
