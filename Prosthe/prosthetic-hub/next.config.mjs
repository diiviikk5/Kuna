/** @type {import('next').NextConfig} */
// Force rebuild for hydration fix
const nextConfig = {
  // Enable gzip/brotli compression
  compress: true,

  // Optimize production builds
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow iframes for OpenClaw
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Security
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/bg-video.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Proxy OpenClaw gateway
  async rewrites() {
    return [
      {
        source: "/api/openclaw/:path*",
        destination: "http://127.0.0.1:18789/:path*",
      },
    ];
  },

  // Optimize bundle
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
