'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

/** 下層ページのヒーロー演出 */
export default function PageHeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__media', { autoAlpha: 0, duration: 1.4, ease: 'power2.out' })
        .from('.hero__img', { scale: 1.12, duration: 2 }, '<')
        .from('.page-hero__title .char', { yPercent: 115, duration: 1.1, stagger: 0.03 }, '<.1')
        .from('[data-hero]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.12 }, '<.2')
        .from('.hero__stripe', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, '<')
    },
    { scope: root }
  )

  return <div ref={root}>{children}</div>
}
