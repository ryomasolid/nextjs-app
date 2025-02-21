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
};

module.exports = {
  output: 'export',
};

export default nextConfig;
