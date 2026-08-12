/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
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
