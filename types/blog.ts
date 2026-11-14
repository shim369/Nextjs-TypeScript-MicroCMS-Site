import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Category = MicroCMSListContent & {
  name: string
}

export type Blog = MicroCMSListContent & {
  title: string
  content: string
  eyecatch?: MicroCMSImage
  category?: Category | null
}

/** 一覧表示用（本文を含まない軽量版） */
export type BlogSummary = Pick<Blog, 'id' | 'title' | 'publishedAt'> & {
  eyecatch: MicroCMSImage | null
  category: string | null
}
