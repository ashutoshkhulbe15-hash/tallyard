/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Consolidate the apex domain onto www so Google stops splitting
      // ranking signals across two hostnames. 308 = permanent.
      {
        source: "/:path*",
        has: [{ type: "host", value: "tallyard.com" }],
        destination: "https://www.tallyard.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
