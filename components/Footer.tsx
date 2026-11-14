import Link from 'next/link'
import { ArrowUp, ArrowUpRight } from './Icons'

const SISTERS = [
  { name: 'NUXT BASE', href: 'https://nuxtbase-gsap.vercel.app/' },
  { name: 'GATSBY BASE', href: 'https://gatsbybase.vercel.app/' },
  { name: 'ASTRO BASE', href: 'https://astrobase.vercel.app/' },
]

const NAV = ['about', 'skills', 'blog', 'contact']

export default function Footer({ home = false }: { home?: boolean }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="sister">
          {SISTERS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" data-reveal>
              <div>
                <small>SISTER SITE</small>
                {s.name}
              </div>
              <span className="circle">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
        <div className="footer__brand" data-reveal>
          <div className="name">NEXT BASE</div>
          <p>Next.js &amp; TypeScript &amp; microCMS</p>
        </div>
        <div className="footer__bottom">
          <small>&copy;2023 NEXT BASE</small>
          <nav aria-label="フッター">
            {NAV.map((id) => (
              <Link key={id} href={home ? `#${id}` : `/#${id}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </nav>
          <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Page Top{' '}
            <span>
              <ArrowUp />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
