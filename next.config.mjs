/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjs-myapp.s3.us-east-1.amazonaws.com',
      },
    ],
  },
  experimental: {
    appDir: true,
  },

  env: {
    MY_REGION: process.env.MY_REGION,
  },
  serverRuntimeConfig: {
    MY_ACCESS_KEY_ID: process.env.MY_ACCESS_KEY_ID,
    MY_SECRET_ACCESS_KEY: process.env.MY_SECRET_ACCESS_KEY,
  },
  publicRuntimeConfig: {
    MY_REGION: process.env.MY_REGION,
  },
};

export default nextConfig;
