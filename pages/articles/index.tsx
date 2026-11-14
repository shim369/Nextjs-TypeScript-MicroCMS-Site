import type { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import PostCard from '../../components/PostCard'
import SplitText from '../../components/SplitText'
import Contact from '../../components/Contact'
import { getBlogs } from '../../lib/microcms'
import type { BlogSummary } from '../../types/blog'

type Props = { posts: BlogSummary[] }

export default function Articles({ posts }: Props) {
  return (
    <Layout title="Blog" description="NEXT BASE のテックブログ。microCMSで管理している記事の一覧です。">
      <PageHero label="Tech Blog" crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}>
        <h1 className="page-hero__title" aria-label="All Posts">
          <SplitText className="line" text="All Posts" />
        </h1>
      </PageHero>

      <section className="section">
        <div className="container">
          {posts.length ? (
            <div className="posts-grid">
              {posts.map((post, i) => (
                <div key={post.id} data-reveal>
                  <PostCard post={post} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <p className="posts-empty">記事はまだありません。</p>
          )}
        </div>
      </section>

      <Contact />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getBlogs()
  return { props: { posts }, revalidate: 60 }
}
