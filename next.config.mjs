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
  // 環境変数を設定
  env: {
    MY_REGION: process.env.MY_REGION, // 環境変数を追加
  },
  serverRuntimeConfig: {
    MY_ACCESS_KEY_ID: process.env.MY_ACCESS_KEY_ID, // サーバー側でのみ使用
    MY_SECRET_ACCESS_KEY: process.env.MY_SECRET_ACCESS_KEY, // サーバー側でのみ使用
  },
  publicRuntimeConfig: {
    MY_REGION: process.env.MY_REGION, // クライアント側で使用
  },
};

export default nextConfig;
