import { createClient } from 'microcms-js-sdk'
import type { Blog, BlogSummary } from '../types/blog'

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

if (!serviceDomain || !apiKey) {
  throw new Error('MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を .env.local に設定してください')
}

const client = createClient({ serviceDomain, apiKey })

const toSummary = (blog: Blog): BlogSummary => ({
  id: blog.id,
  title: blog.title,
  publishedAt: blog.publishedAt ?? blog.createdAt,
  eyecatch: blog.eyecatch ?? null,
  category: blog.category?.name ?? null,
})

/** 公開日の新しい順に記事一覧を取得 */
export const getBlogs = async (limit = 100): Promise<BlogSummary[]> => {
  const { contents } = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: {
      limit,
      orders: '-publishedAt',
      fields: 'id,title,publishedAt,createdAt,eyecatch,category.name',
    },
  })
  return contents.map(toSummary)
}

/** 記事詳細を取得（存在しなければ null） */
export const getBlog = async (id: string): Promise<Blog | null> => {
  try {
    return await client.getListDetail<Blog>({ endpoint: 'blogs', contentId: id })
  } catch {
    return null
  }
}
