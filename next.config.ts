import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 'use cache' / cacheLife / cacheTag + Partial Prerendering
  cacheComponents: true,
  // 全ページを静的に生成できるため不要。無効にすると、存在しない記事に
  // 共通の外枠を先に返さず、notFound() で正しく 404 ステータスを返せる
  partialPrefetching: false,
  // 自動メモ化（useMemo / useCallback を手書きしない）
  reactCompiler: true,
  typedRoutes: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.microcms-assets.io' }],
  },
}

export default nextConfig
