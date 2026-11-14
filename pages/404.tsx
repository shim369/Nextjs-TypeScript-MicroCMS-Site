import Link from 'next/link'
import Layout from '../components/Layout'
import { ArrowLeft } from '../components/Icons'

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <section className="notfound">
        <div className="container">
          <div className="notfound__code">404</div>
          <p>お探しのページは見つかりませんでした。移動または削除された可能性があります。</p>
          <Link href="/" className="btn">
            <ArrowLeft />
            Back to Top
          </Link>
        </div>
      </section>
    </Layout>
  )
}
