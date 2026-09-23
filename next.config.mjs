/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  // Allow phone/LAN testing against `next dev` (e.g. http://192.168.x.x:3000).
  allowedDevOrigins: ['192.168.29.18'],
};

export default nextConfig;
