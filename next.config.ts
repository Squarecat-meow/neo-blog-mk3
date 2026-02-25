import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', // 노션 업로드 파일 원본 저장소
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 언스플래시 이미지 사용 시
      },
    ],
  },
};

export default nextConfig;
