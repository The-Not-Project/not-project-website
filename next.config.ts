import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gray-certain-lungfish-417.mypinata.cloud',
        port: '',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'd14sc23dxgzlmj.cloudfront.net',
        port: '',
        pathname: '/images/**',
      }
    ],
  },
};

export default nextConfig;
