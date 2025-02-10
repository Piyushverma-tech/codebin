import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**', // Allows all paths under this hostname
      },
    ],
  },

  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
