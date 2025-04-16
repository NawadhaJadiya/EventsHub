/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add your image domains here if needed
  },
  env: {
    MONGO_URL: process.env.MONGO_URL,
  },
}

module.exports = nextConfig 