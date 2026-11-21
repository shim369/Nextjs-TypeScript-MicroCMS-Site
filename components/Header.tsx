'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV, SITE } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const home = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // スクロール量でヘッダー縮小 & 進捗バー
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // メニュー表示中は背面をスクロールさせない / Esc で閉じる
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // 表示中セクションのナビをハイライト（トップのみ）
  useEffect(() => {
    if (!home) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [home])

  const close = () => setOpen(false)

  return (
    <>
      <div className="progress" ref={progressRef} aria-hidden="true" />
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <Link href="/" className="header__logo" aria-label={`${SITE.name} トップへ`} onClick={close}>
          NEXT
          <br />
          BASE
        </Link>
        <nav className="header__nav" aria-label="メイン">
          {NAV.map(({ id, label }) => (
            <Link
              key={id}
              href={`/#${id}`}
              className={id === 'contact' ? 'header__cta' : home && active === id ? 'is-active' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className={`burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="spMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <nav className={`sp-menu${open ? ' is-open' : ''}`} id="spMenu" aria-label="モバイル">
        {NAV.map(({ id, label }) => (
          <Link key={id} href={`/#${id}`} onClick={close}>
            {label}
          </Link>
        ))}
        <Link href="/articles" onClick={close} className="sp-menu__sub">
          All Posts →
        </Link>
        <small>{SITE.tagline}</small>
      </nav>
    </>
  )
}
