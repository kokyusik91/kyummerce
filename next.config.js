/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'picsum.photos',
      'raw.githubusercontent.com',
      'image.msscdn.net',
      'lh3.googleusercontent.com',
      'devjeans-photo.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
