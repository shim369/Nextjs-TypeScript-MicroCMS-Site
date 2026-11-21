import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__code">404</div>
        <p>お探しのページは見つかりませんでした。移動または削除された可能性があります。</p>
        <Link href="/" className="btn">
          <ArrowLeft />
          Back to Top
        </Link>
      </div>
    </section>
  )
}
