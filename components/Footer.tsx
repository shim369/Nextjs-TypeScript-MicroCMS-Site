import Link from 'next/link'
import { ArrowUpRight } from './Icons'
import ToTop from './ToTop'
import { NAV, SISTERS, SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="sister">
          {SISTERS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="sister__link" data-reveal>
              <div>
                <small>SISTER SITE</small>
                {s.name}
              </div>
              <span className="sister__circle">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
        <div className="footer__brand" data-reveal>
          <div className="footer__name">{SITE.name}</div>
          <p>{SITE.tagline}</p>
        </div>
        <div className="footer__bottom">
          <small>&copy;2023 {SITE.name}</small>
          <nav aria-label="フッター">
            {NAV.map(({ id, label }) => (
              <Link key={id} href={`/#${id}`}>
                {label}
              </Link>
            ))}
          </nav>
          <ToTop />
        </div>
      </div>
    </footer>
  )
}
