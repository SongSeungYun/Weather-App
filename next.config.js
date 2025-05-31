/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['openweathermap.org'], // 외부 이미지 도메인 허용
  }
}

module.exports = nextConfig
