/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@maham/ui'],
  async rewrites() {
    return [
      {
        source: '/finance/:path*',
        destination: 'http://localhost:3002/:path*',
      },
      { source: '/hr/:path*', destination: 'http://localhost:3302/:path*' },
      { source: '/sales/:path*', destination: 'http://localhost:3303/:path*' },
      // auth routes
      { source: '/auth/:path*', destination: 'http://localhost:3002/:path*' },

      // // 👇 important: serve static chunks from auth app
      // {
      //   source: '/_next/static/:path*',
      //   destination: 'http://localhost:3002/_next/static/:path*',
      // },

      // زوّد حسب بورتاتك
    ];
  },
};

export default nextConfig;
