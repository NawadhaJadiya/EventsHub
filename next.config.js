/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    MONGO_URL: process.env.MONGO_URL,
  },
}

module.exports = nextConfig
