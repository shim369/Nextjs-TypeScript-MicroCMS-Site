import Footer from '@/components/Footer'
import PageMotion from '@/components/motion/PageMotion'

/** template はページ遷移ごとに作り直されるため、スクロール演出をページ単位で初期化できる */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageMotion>
      <main id="top">{children}</main>
      <Footer />
    </PageMotion>
  )
}
