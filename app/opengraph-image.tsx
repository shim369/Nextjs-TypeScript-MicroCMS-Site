import { ImageResponse } from 'next/og'

export const alt = 'NEXT BASE — Web Development'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** サイト共通の OG 画像（記事ページは microCMS のアイキャッチを使用） */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(60% 70% at 78% 40%, rgba(228,90,25,.55), transparent 70%), #050505',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 120,
            height: 120,
            paddingLeft: 18,
            background: '#029183',
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          <span>NEXT</span>
          <span>BASE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2 }}>WEB</div>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2 }}>DEVELOPMENT</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 36, fontSize: 30, color: 'rgba(255,255,255,.7)' }}>
            <div style={{ width: 64, height: 3, marginRight: 20, background: 'linear-gradient(90deg,#e3281f,#e8891e)' }} />
            Next.js & TypeScript & microCMS
          </div>
        </div>
      </div>
    ),
    size
  )
}
