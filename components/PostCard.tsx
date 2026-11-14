import Link from 'next/link'
import type { BlogSummary } from '../types/blog'
import { cmsImage, formatDate } from '../lib/format'

const FALLBACK_IMAGES = ['/img/image6.webp', '/img/image2.webp', '/img/image4.webp', '/img/image1.webp']

export default function PostCard({ post, index }: { post: BlogSummary; index: number }) {
  const src = post.eyecatch ? cmsImage(post.eyecatch.url, 840) : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]

  return (
    <Link href={`/articles/${post.id}`} className="post">
      <div className="post__img">
        <img src={src} alt="" loading="lazy" />
      </div>
      <span className="post__num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="post__body">
        <div className="post__meta">
          {post.category && <span className="post__cat">{post.category}</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <h3 className="post__title">{post.title}</h3>
        <span className="post__more">
          Read More <i />
        </span>
      </div>
    </Link>
  )
}
