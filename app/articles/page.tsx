import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SplitText from '@/components/SplitText'
import Contact from '@/components/Contact'
import PostsFilter from '@/components/blog/PostsFilter'
import { getBlogs } from '@/lib/microcms'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'NEXT BASE のテックブログ。microCMS で管理している記事の一覧です。',
  alternates: { canonical: '/articles' },
}

export default async function ArticlesPage() {
  const posts = await getBlogs()

  return (
    <>
      <PageHero label="Tech Blog" crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}>
        <h1 className="page-hero__title" aria-label="All Posts">
          <SplitText className="page-hero__line" text="All Posts" />
        </h1>
      </PageHero>

      <section className="section posts">
        <div className="container">
          <PostsFilter posts={posts} />
        </div>
      </section>

      <Contact />
    </>
  )
}
