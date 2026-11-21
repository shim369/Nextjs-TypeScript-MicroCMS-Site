import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Route } from 'next'
import PageHeroMotion from './motion/PageHeroMotion'

type Props = {
  label: string
  image?: string
  crumbs: { label: string; href?: Route }[]
  children: ReactNode
}

/** 下層ページ共通のヒーロー */
export default function PageHero({ label, image = '/img/page-hero.webp', crumbs, children }: Props) {
  return (
    <PageHeroMotion>
      <section className="page-hero">
        <div className="hero__media">
          <div className="hero__img">
            <Image src={image} alt="" fill priority sizes="(max-width: 820px) 100vw, 72vw" />
          </div>
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
    </PageHeroMotion>
  )
}
