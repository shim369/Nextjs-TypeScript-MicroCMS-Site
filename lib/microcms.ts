import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { createClient } from 'microcms-js-sdk'
import type { Blog, BlogSummary } from '@/types/blog'

/** microCMS の更新時に Webhook から無効化するキャッシュタグ */
export const BLOG_TAG = 'blogs'

const getClient = () => {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY
  if (!serviceDomain || !apiKey) {
    throw new Error('Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY in .env.local')
  }
  return createClient({ serviceDomain, apiKey })
}

const toSummary = (blog: Blog): BlogSummary => ({
  id: blog.id,
  title: blog.title,
  publishedAt: blog.publishedAt ?? blog.createdAt,
  eyecatch: blog.eyecatch ?? null,
  category: blog.category?.name ?? null,
})

/** 公開日の新しい順に記事一覧を取得 */
export async function getBlogs(): Promise<BlogSummary[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag(BLOG_TAG)

  const { contents } = await getClient().getList<Blog>({
    endpoint: 'blogs',
    queries: {
      limit: 100,
      orders: '-publishedAt',
      fields: 'id,title,publishedAt,createdAt,eyecatch,category.name',
    },
  })
  return contents.map(toSummary)
}

/** 記事詳細を取得（存在しなければ null） */
export async function getBlog(id: string): Promise<Blog | null> {
  'use cache'
  cacheLife('minutes')
  cacheTag(BLOG_TAG, `${BLOG_TAG}:${id}`)

  try {
    return await getClient().getListDetail<Blog>({ endpoint: 'blogs', contentId: id })
  } catch {
    return null
  }
}
