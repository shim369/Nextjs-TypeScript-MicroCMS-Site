'use client'

import { useState } from 'react'
import PostCard from './PostCard'
import type { BlogSummary } from '@/types/blog'

const ALL = 'All'

/** カテゴリで絞り込める記事グリッド */
export default function PostsFilter({ posts }: { posts: BlogSummary[] }) {
  const categories = [ALL, ...new Set(posts.map((p) => p.category).filter((c): c is string => !!c))]
  const [current, setCurrent] = useState(ALL)
  const visible = current === ALL ? posts : posts.filter((p) => p.category === current)

  if (!posts.length) return <p className="posts__empty">記事はまだありません。</p>

  return (
    <>
      {categories.length > 2 && (
        <div className="posts__filter" role="group" aria-label="カテゴリで絞り込み" data-reveal>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`posts__filter-btn${c === current ? ' is-active' : ''}`}
              aria-pressed={c === current}
              onClick={() => setCurrent(c)}
            >
              {c}
              <span>{c === ALL ? posts.length : posts.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
      )}
      <div className="posts__grid" data-reveal>
        {visible.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            index={posts.indexOf(post)}
            sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 380px"
          />
        ))}
      </div>
    </>
  )
}
