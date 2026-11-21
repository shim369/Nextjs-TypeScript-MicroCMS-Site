import type { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/microcms'
import { SITE } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogs()
  return [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/articles`, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({ url: `${SITE.url}/articles/${p.id}`, lastModified: p.publishedAt, priority: 0.6 })),
  ]
}
