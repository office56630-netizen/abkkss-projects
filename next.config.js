
  // Build output optimized for Vercel / standalone deployments
  output: 'standalone',

  // Disable Next.js image optimization
  images: {
    unoptimized: true,
  },

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

  // Dev server behavior
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
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *;',
          },
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
