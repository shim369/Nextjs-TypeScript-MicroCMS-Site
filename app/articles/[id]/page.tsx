import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import Contact from '@/components/Contact'
import { ArrowLeft } from '@/components/Icons'
import { getBlog, getBlogs } from '@/lib/microcms'
import { formatDate, readingMinutes, toPlainText } from '@/lib/format'
import { buildToc } from '@/lib/toc'

export async function generateStaticParams() {
  const posts = await getBlogs()
  return posts.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps<'/articles/[id]'>): Promise<Metadata> {
  const { id } = await params
  const post = await getBlog(id)
  if (!post) return { title: 'Page Not Found' }
  const description = toPlainText(post.content).slice(0, 110) || undefined
  const images = post.eyecatch ? [{ url: post.eyecatch.url, width: post.eyecatch.width, height: post.eyecatch.height }] : undefined
  return {
    title: post.title,
    description,
    alternates: { canonical: `/articles/${id}` },
    openGraph: { type: 'article', title: post.title, description, publishedTime: post.publishedAt, images },
  }
}

export default async function ArticlePage({ params }: PageProps<'/articles/[id]'>) {
  // Suspense の外で取得して notFound() を呼ぶと、存在しない記事に 404 ステータスを返せる
  const { id } = await params
  const [post, posts] = await Promise.all([getBlog(id), getBlogs()])
  if (!post) notFound()

  const { html, toc } = buildToc(post.content)

  // 一覧は新しい順: PREV = ひとつ古い記事 / NEXT = ひとつ新しい記事
  const index = posts.findIndex((p) => p.id === id)
  const prev = index >= 0 ? posts[index + 1] : undefined
  const next = index > 0 ? posts[index - 1] : undefined

  return (
    <>
      <PageHero
        label="Tech Blog"
        image={post.eyecatch?.url}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/articles' }, { label: post.title }]}
      >
        <h1 className="page-hero__title page-hero__title--post" data-hero>
          {post.title}
        </h1>
        <div className="page-hero__meta" data-hero>
          {post.category?.name && <span className="chip">{post.category.name}</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>{readingMinutes(post.content)} min read</span>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <article className={`article${toc.length >= 2 ? ' has-toc' : ''}`}>
            {toc.length >= 2 && (
              <nav className="toc" aria-label="目次" data-reveal>
                <p className="toc__title">Contents</p>
                <ol>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="article__main">
              <div className="prose" data-reveal dangerouslySetInnerHTML={{ __html: html }} />

              {(prev || next) && (
                <nav className="pager" aria-label="前後の記事" data-reveal>
                  {prev && (
                    <Link href={`/articles/${prev.id}`} className="pager__link">
                      <small>PREV</small>
                      <span>{prev.title}</span>
                    </Link>
                  )}
                  {next && (
                    <Link href={`/articles/${next.id}`} className="pager__link pager__link--next">
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
            </div>
          </article>
        </div>
      </section>

      <Contact />
    </>
  )
}
