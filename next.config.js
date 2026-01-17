/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build output optimized for Vercel / standalone deployments
  output: 'standalone',

  // Disable Next.js image optimization (useful for static / external images)
  images: {
    unoptimized: true,
  },

  // ✅ FIX: Correct location for Next.js 16+
  // External packages allowed in Server Components
  serverExternalPackages: ['mongodb'],

  // Webpack configuration (dev-only file watching fix)
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },

  // Dev server behavior (mostly relevant for Pages Router)
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },

  // Global HTTP headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow embedding in iframes (modern, standards-based)
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *;',
          },

          // CORS configuration
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.CORS_ORIGINS || '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
