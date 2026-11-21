import Image from 'next/image'
import Link from 'next/link'
import type { BlogSummary } from '@/types/blog'
import { formatDate } from '@/lib/format'

type Props = {
  post: BlogSummary
  index: number
  /** next/image の sizes（一覧グリッド / 横スクロールで異なる） */
  sizes?: string
}

export default function PostCard({ post, index, sizes = '(max-width: 820px) 78vw, 420px' }: Props) {
  return (
    <Link href={`/articles/${post.id}`} className="post">
      <div className="post__img">
        <Image src={post.eyecatch?.url ?? '/img/post-fallback.webp'} alt="" fill sizes={sizes} />
      </div>
      <span className="post__num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="post__body">
        <div className="post__meta">
          {post.category && <span className="chip">{post.category}</span>}
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
