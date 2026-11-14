import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Contact from '../../components/Contact'
import { ArrowLeft } from '../../components/Icons'
import { getBlog, getBlogs } from '../../lib/microcms'
import { cmsImage, formatDate } from '../../lib/format'
import type { Blog } from '../../types/blog'

type Neighbor = { id: string; title: string } | null

type Props = {
  post: Blog
  prev: Neighbor
  next: Neighbor
}

const toPlainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export default function Article({ post, prev, next }: Props) {
  const eyecatch = post.eyecatch ? cmsImage(post.eyecatch.url, 1600) : undefined
  const excerpt = toPlainText(post.content).slice(0, 110)

  return (
    <Layout title={post.title} description={excerpt || undefined} image={eyecatch}>
      <PageHero
        label="Tech Blog"
        image={eyecatch}
        animKey={post.id}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/articles' }, { label: post.title }]}
      >
        <h1 className="page-hero__title page-hero__title--post" data-hero>
          {post.title}
        </h1>
        <div className="page-hero__meta" data-hero>
          {post.category?.name && <span className="post__cat">{post.category.name}</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <article className="article">
            <div className="prose" data-reveal dangerouslySetInnerHTML={{ __html: post.content }} />

            {(prev || next) && (
              <nav className="pager" aria-label="前後の記事" data-reveal>
                {prev && (
                  <Link href={`/articles/${prev.id}`}>
                    <small>PREV</small>
                    <span>{prev.title}</span>
                  </Link>
                )}
                {next && (
                  <Link href={`/articles/${next.id}`} className="pager__next">
                    <small>NEXT</small>
                    <span>{next.title}</span>
                  </Link>
                )}
              </nav>
            )}

            <div className="article__foot" data-reveal>
              <Link href="/articles" className="btn">
                <ArrowLeft />
                Back to Blog
              </Link>
            </div>
          </article>
        </div>
      </section>

      <Contact />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogs()
  return {
    paths: posts.map((p) => ({ params: { id: p.id } })),
    // ビルド後に追加された記事も初回アクセス時に生成
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
  const id = params?.id
  if (!id) return { notFound: true }

  const [post, posts] = await Promise.all([getBlog(id), getBlogs()])
  if (!post) return { notFound: true, revalidate: 60 }

  // 一覧は新しい順: PREV = ひとつ古い記事 / NEXT = ひとつ新しい記事
  const index = posts.findIndex((p) => p.id === id)
  const pick = (i: number): Neighbor => (posts[i] ? { id: posts[i].id, title: posts[i].title } : null)

  return {
    props: {
      post,
      prev: index >= 0 ? pick(index + 1) : null,
      next: index >= 0 ? pick(index - 1) : null,
    },
    revalidate: 60,
  }
}
