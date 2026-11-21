'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'

/** 全ページ共通: セクション見出し / data-reveal / マグネットボタン */
export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return

      gsap.utils.toArray<HTMLElement>('.sec-head').forEach((head) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 80%' } })
        tl.from(head.querySelectorAll('.sec-head__title .char'), {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'expo.out',
        })
        const num = head.querySelector('.sec-head__num')
        if (num) tl.from(num, { scale: 0.6, autoAlpha: 0, duration: 1.4, ease: 'expo.out' }, 0)
      })

      gsap.set('[data-reveal]', { y: 40 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        onEnter: (els) =>
          gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'expo.out', overwrite: true }),
      })

      // マグネットボタン
      const cleanups = gsap.utils.toArray<HTMLElement>('.btn, .sister__circle, .to-top__icon').map((el) => {
        const onMove = contextSafe!((e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.4,
            ease: 'power3.out',
          })
        })
        const onLeave = contextSafe!(() => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.4)' }))
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })

      const refresh = () => ScrollTrigger.refresh()
      const raf = requestAnimationFrame(refresh)
      window.addEventListener('load', refresh)
      document.fonts?.ready.then(refresh)

      // 記事の絞り込みや画像の読み込みでページの高さが変わったら、発火位置を計算し直す
      // （高さが縮んだまま古い位置を待つと、下のフォームなどが表示されなくなる）
      let timer = 0
      let lastHeight = root.current?.offsetHeight ?? 0
      const ro = new ResizeObserver(([entry]) => {
        const height = Math.round(entry.contentRect.height)
        if (height === lastHeight) return
        lastHeight = height
        window.clearTimeout(timer)
        timer = window.setTimeout(refresh, 150)
      })
      if (root.current) ro.observe(root.current)

      return () => {
        cancelAnimationFrame(raf)
        window.clearTimeout(timer)
        ro.disconnect()
        window.removeEventListener('load', refresh)
        cleanups.forEach((fn) => fn())
      }
    },
    { scope: root }
  )

  return <div ref={root}>{children}</div>
}
