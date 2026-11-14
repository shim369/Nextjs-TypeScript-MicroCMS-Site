import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import Cursor from './Cursor'
import { useSiteAnimations } from '../hooks/useSiteAnimations'

const SITE_NAME = 'NEXT BASE'
const DEFAULT_DESCRIPTION =
  'Next.js・TypeScript・microCMSで制作したWeb制作ポートフォリオサイト NEXT BASE。GSAPによるスクロールアニメーションと、ヘッドレスCMSのブログを組み込んでいます。'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  home?: boolean
  image?: string
}

export default function Layout({ children, title, description = DEFAULT_DESCRIPTION, home = false, image }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()
  // ハッシュ(#about 等)の変化では再初期化しない
  useSiteAnimations(root, [asPath.split('#')[0]])

  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Web Development`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={home ? 'website' : 'article'} />
        <meta property="og:site_name" content={SITE_NAME} />
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div ref={root}>
        <Cursor />
        <Header home={home} />
        <main id="top">{children}</main>
        <Footer home={home} />
      </div>
    </>
  )
}
