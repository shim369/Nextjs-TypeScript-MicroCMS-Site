import Link from 'next/link'
import { ReactNode, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'

type Props = {
  label: string
  image?: string
  crumbs: { label: string; href?: string }[]
  children: ReactNode
  /** 再生し直すためのキー（記事IDなど） */
  animKey?: string
}

/** 下層ページ共通のヒーロー */
export default function PageHero({ label, image = '/img/detail-hero.webp', crumbs, children, animKey }: Props) {
  const ref = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__media', { autoAlpha: 0, duration: 1.4, ease: 'power2.out' })
        .from('.hero__media img', { scale: 1.12, duration: 2 }, '<')
        .from('.page-hero__title .char', { yPercent: 115, duration: 1.1, stagger: 0.03 }, '<.1')
        .from('[data-hero]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.12 }, '<.2')
        .from('.hero__stripe', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, '<')
    }, ref)
    return () => ctx.revert()
  }, [animKey])

  return (
    <section className="page-hero" ref={ref}>
      <div className="hero__media">
        <img src={image} alt="" fetchPriority="high" />
      </div>
      <div className="hero__stripe" />
      <div className="page-hero__inner">
        <p className="page-hero__label" data-hero>
          {label}
        </p>
        {children}
        <ol className="breadcrumb" aria-label="パンくずリスト" data-hero>
          {crumbs.map((c) => (
            <li key={c.label}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
