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
    appDir: true, // appディレクトリを使用している場合
  },
  // output: 'export' を削除
};

export default nextConfig;
