/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://i.ibb.co', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
