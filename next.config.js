/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  
  // 1. Moved out of experimental (Next.js 16+ requirement)
  serverExternalPackages: ['mongodb'],

  // 2. We keep your webpack config but add a flag to tell Next.js 
  // to use Webpack for the build instead of Turbopack.
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

  // 3. Optional: Add this if you want to explicitly signal 
  // compatibility or transition to Turbopack later.
  experimental: {
    // Setting this to an empty object or removing webpack allows Turbopack.
    // However, since you have custom watchOptions, keeping Webpack is safer for now.
  },

  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
