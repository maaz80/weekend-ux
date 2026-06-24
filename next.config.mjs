/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Optimize package imports to reduce unused JavaScript and keep bundle sizes minimal
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
    ],
    optimizeCss: true,
  },
  // ✅ Add this:
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
