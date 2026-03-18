/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint during dev; don't block production builds
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
