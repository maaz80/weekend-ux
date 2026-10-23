/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the legacy FTP build as a static export, while allowing Hostinger's
  // Node app to build with ISR by omitting STATIC_EXPORT.
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'weekendux.in' }],
        destination: 'https://www.weekendux.in/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Don't reuse prefetched static page payloads for minutes in the browser;
    // admin-triggered ISR should be visible on the next client navigation.
    staleTimes: {
      static: 0,
    },
    optimizePackageImports: [
      'react-icons',
      'react-icons/fi',
      'react-icons/fa',
      'react-icons/si',
      'react-icons/io',
      'react-icons/io5',
      'react-icons/fa6',
      'lucide-react',
      'framer-motion',
      'swiper',
      'canvas-confetti',
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
