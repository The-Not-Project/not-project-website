import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

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
        hostname: 'd14sc23dxgzlmj.cloudfront.net',
        port: '',
        pathname: '/images/**',
      }
    ],
  },
};

export default withPWA(nextConfig);
