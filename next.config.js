/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
