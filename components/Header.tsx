import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const

type Props = {
  /** トップページでは同一ページ内アンカー、それ以外ではトップへのリンクにする */
  home?: boolean
}

export default function Header({ home = false }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const href = (id: string) => (home ? `#${id}` : `/#${id}`)

  const toggleMenu = useCallback((next?: boolean) => {
    setOpen((prev) => {
      const isOpen = next ?? !prev
      document.body.style.overflow = isOpen ? 'hidden' : ''
      return isOpen
    })
  }, [])

  // スクロール量でヘッダー縮小 & 進捗バー
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc でメニューを閉じる / アンマウント時にスクロールロック解除
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && toggleMenu(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [toggleMenu])

  // 表示中セクションのナビをハイライト（トップのみ）
  useEffect(() => {
    if (!home) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [home])

  const renderLink = (id: string, label: string, className?: string) =>
    home ? (
      <a key={id} href={href(id)} className={className} onClick={() => toggleMenu(false)}>
        {label}
      </a>
    ) : (
      <Link key={id} href={href(id)} className={className} onClick={() => toggleMenu(false)}>
        {label}
      </Link>
    )

  return (
    <>
      <div className="progress" ref={progressRef} aria-hidden="true" />
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <Link href="/" className="logo" aria-label="NEXT BASE トップへ">
          NEXT
          <br />
          BASE
        </Link>
        <nav className="nav" aria-label="メイン">
          {NAV.map(({ id, label }) =>
            renderLink(id, label, id === 'contact' ? 'nav__cta' : active === id ? 'is-active' : undefined),
          )}
        </nav>
        <button
          className={`burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="spMenu"
          onClick={() => toggleMenu()}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <nav className={`sp-menu${open ? ' is-open' : ''}`} id="spMenu" aria-label="モバイル">
        {NAV.map(({ id, label }) => renderLink(id, label))}
        <small>Next.js &amp; TypeScript &amp; microCMS</small>
      </nav>
    </>
  )
}
