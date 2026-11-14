import { RefObject } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/** 全ページ共通: セクション見出し / data-reveal / マグネットボタン */
export function useSiteAnimations(scope: RefObject<HTMLElement>, deps: unknown[] = []) {
  useIsomorphicLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return

    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      // セクション見出し
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

      // 汎用フェードイン
      gsap.set('[data-reveal]', { y: 40 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        onEnter: (els) =>
          gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'expo.out', overwrite: true }),
      })

      // マグネットボタン
      gsap.utils.toArray<HTMLElement>('.btn, .sister .circle, .to-top span').forEach((el) => {
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.4,
            ease: 'power3.out',
          })
        }
        const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.4)' })
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        })
      })
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', refresh)
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
