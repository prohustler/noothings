/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'noothings.kr',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
