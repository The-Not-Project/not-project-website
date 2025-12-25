import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev, // This disables PWA in development mode
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

// Only wrap with PWA if we are not in development, 
// or accept that Webpack will be used instead of Turbopack.
export default isDev ? nextConfig : withPWA(nextConfig);