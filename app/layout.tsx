import type { Metadata, Viewport } from 'next'
import { Montserrat, Noto_Sans_JP } from 'next/font/google'
import Header from '@/components/Header'
import Cursor from '@/components/Cursor'
import { SITE } from '@/lib/site'
import '@/styles/main.scss'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Web Development`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: 'website', siteName: SITE.name, locale: 'ja_JP' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

// アニメーション前の要素を描画前に隠す（動きを減らす設定のときは何もしない）
const jsReady = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-ready')`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ja"
      className={`${montserrat.variable} ${notoSansJP.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsReady }} />
        <noscript>
          <style>{'.loader{display:none}'}</style>
        </noscript>
      </head>
      <body>
        <Cursor />
        <Header />
        {children}
      </body>
    </html>
  )
}
