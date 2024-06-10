/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["coin-images.coingecko.com", "s3.coinmarketcap.com"],
  },
  reactStrictMode: true,
};

export default nextConfig;
