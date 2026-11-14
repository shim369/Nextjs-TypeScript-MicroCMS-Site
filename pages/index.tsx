import type { GetStaticProps } from 'next'
import Link from 'next/link'
import { PointerEvent, useRef, useState } from 'react'
import Layout from '../components/Layout'
import SplitText from '../components/SplitText'
import Marquee from '../components/Marquee'
import PostCard from '../components/PostCard'
import Contact from '../components/Contact'
import { ArrowRight, GithubIcon } from '../components/Icons'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { getBlogs } from '../lib/microcms'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'
import type { BlogSummary } from '../types/blog'

const SKILLS = [
  { name: 'Astro', tag: 'SSG', img: '/img/astro.webp' },
  { name: 'JavaScript', tag: 'Language', img: '/img/js.webp' },
  { name: 'Next.js', tag: 'React FW', img: '/img/next.webp' },
  { name: 'Nuxt.js', tag: 'Vue FW', img: '/img/nuxt.webp' },
  { name: 'Python', tag: 'Language', img: '/img/py.webp' },
  { name: 'Django', tag: 'Backend', img: '/img/django.webp' },
  { name: 'microCMS', tag: 'Headless CMS', img: '/img/microcms.png' },
  { name: 'Figma', tag: 'Design', img: '/img/figma.webp' },
]

const MARQUEE = ['Next.js', 'TypeScript', 'microCMS', 'GSAP', 'Vercel', 'Astro', 'Nuxt.js', 'Gatsby', 'Python', 'Figma']

const HOME_POSTS = 6

// ローダーは最初の訪問時だけ再生（クライアント遷移で戻ってきたときは省略）
let introPlayed = false

type Props = { posts: BlogSummary[] }

export default function Home({ posts }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [showLoader] = useState(() => !introPlayed)
  const playLoaderRef = useRef(showLoader)

  useIsomorphicLayoutEffect(() => {
    const reduce = prefersReducedMotion()
    // StrictMode で effect が2回走っても再生できるよう、初回描画時の判定を使う
    const playLoader = playLoaderRef.current && !reduce
    introPlayed = true
    if (reduce) {
      gsap.set('.loader', { display: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      // Loader → Hero intro
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      if (playLoader) {
        intro
          .from('.loader__logo span', { yPercent: 110, duration: 1, stagger: 0.08 })
          .to('.loader__bar', { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=.4')
          .to('.loader__logo', { yPercent: -20, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
          .to('.loader__panel', { scaleY: 0, duration: 0.9, ease: 'expo.inOut' }, '-=.2')
          .set('.loader', { display: 'none' })
      }
      intro
        .from('.hero__media', { autoAlpha: 0, duration: 1.6, ease: 'power2.out' }, playLoader ? '-=.5' : 0)
        .from('.hero__media img', { scale: 1.15, duration: 2.2 }, '<')
        .from('.hero__title .char', { yPercent: 115, duration: 1.2, stagger: 0.03 }, '<.2')
        .from('[data-hero]', { y: 20, autoAlpha: 0, duration: 1, stagger: 0.15 }, '<.6')
        .from('.hero__stripe', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, '<')

      // Hero parallax
      const heroScroll = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__media img', { yPercent: -10, ease: 'none', scrollTrigger: { ...heroScroll } })
      gsap.to('.hero__inner', { yPercent: 20, autoAlpha: 0, ease: 'none', scrollTrigger: { ...heroScroll } })

      // About: 画像のクリップ表示 + パララックス + バッジ
      gsap.from('[data-clip]', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '[data-clip]', start: 'top 80%' },
      })
      gsap.fromTo(
        '[data-parallax]',
        { yPercent: -10 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: '[data-clip]', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      gsap.from('.about__badge', {
        scale: 0,
        rotate: -90,
        duration: 1.2,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.about__wrap', start: 'top 60%' },
      })

      // カウンター
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const obj = { v: 0 }
        gsap.to(obj, {
          v: Number(el.dataset.count),
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v))
          },
        })
      })

      // Skills
      gsap.from('[data-skill]', {
        y: 60,
        autoAlpha: 0,
        rotateX: -25,
        transformPerspective: 800,
        duration: 1,
        ease: 'expo.out',
        stagger: { each: 0.08, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: '.skills__grid', start: 'top 80%' },
      })

      // Blog: 縦スクロールに合わせて横に流す（PC・スマホ共通）
      const track = trackRef.current
      if (!track) return
      const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const tween = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.blog__pin',
          start: 'top top',
          end: () => '+=' + getDist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('.blog__bar i', { scaleX: self.progress }),
        },
      })
      gsap.utils.toArray<HTMLElement>('.blog__track .post').forEach((card) => {
        const body = card.querySelector('.post__body')
        if (!body) return
        gsap.from(body, {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 85%' },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  // スキルカードのスポットライト
  const onSkillMove = (e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.skill')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Layout home>
      <div ref={root}>
        {showLoader && (
          <div className="loader" aria-hidden="true">
            <div className="loader__panel" />
            <div className="loader__logo">
              <span>NEXT</span>
              <span>BASE</span>
            </div>
            <div className="loader__bar" />
          </div>
        )}
        {/* Hero */}
        <section className="hero" id="hero">
          <div className="hero__media">
            <img src="/img/index-hero.webp" alt="" fetchPriority="high" />
          </div>
          <div className="hero__stripe" />
          <div className="hero__inner">
            <h1 className="hero__title" aria-label="Web Development">
              <SplitText className="line" text="Web" />
              <SplitText className="line" text="Development" />
            </h1>
            <p className="hero__sub" data-hero>
              Next.js &amp; TypeScript &amp; microCMS
            </p>
          </div>
          <div className="hero__foot" data-hero>
            <a href="#contact" className="hero__link">
              <h2>
                制作のご依頼について
                <ArrowRight />
              </h2>
              <p>
                Webサイトの新規制作・リニューアルのご相談を承っています。まずはContactからお気軽にお問い合わせください。
              </p>
            </a>
          </div>
        </section>

        <Marquee items={MARQUEE} />

        {/* About */}
        <section className="section about" id="about">
          <div className="container">
            <div className="sec-head">
              <span className="sec-head__num">01</span>
              <SplitText as="h2" className="sec-head__title" text="About" />
            </div>
            <div className="about__grid">
              <div>
                <span className="about__label" data-reveal>
                  ABOUT THIS SITE
                </span>
                <h3 className="about__title" data-reveal>
                  NEXT BASE<em>について</em>
                </h3>
                <p className="about__text" data-reveal>
                  このサイトは<strong>Next.js</strong>と<strong>TypeScript</strong>
                  をベースに、GSAPのスクロールアニメーションを組み合わせて制作しています。
                  <br />
                  ブログ記事はヘッドレスCMS「<strong>microCMS</strong>
                  」で管理し、ISRで公開後まもなくサイトに反映。お問い合わせフォームはAPI
                  Routeから直接メールで届く仕組みです。
                </p>
                <dl className="about__stats" data-reveal>
                  <div>
                    <dt className="grad-text" data-count={SKILLS.length}>
                      {SKILLS.length}
                    </dt>
                    <dd>SKILLS</dd>
                  </div>
                  <div>
                    <dt className="grad-text">ISR</dt>
                    <dd>RENDERING</dd>
                  </div>
                  <div>
                    <dt className="grad-text">CMS</dt>
                    <dd>HEADLESS</dd>
                  </div>
                </dl>
                <a
                  href="https://github.com/shim369/Nextjs-TypeScript-Newt-Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  data-reveal
                >
                  <GithubIcon />
                  Github
                </a>
              </div>
              <div className="about__wrap">
                <div className="about__media" data-clip>
                  <img src="/img/image3.webp" alt="オレンジに光るキーボード" loading="lazy" data-parallax />
                </div>
                <div className="about__badge" aria-hidden="true">
                  <svg viewBox="0 0 120 120">
                    <defs>
                      <path id="badgeCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                    </defs>
                    <text fontFamily="Montserrat" fontSize="10" fontWeight="600" fill="#fff">
                      <textPath href="#badgeCircle" textLength="286" lengthAdjust="spacing">
                        NEXT.JS • TYPESCRIPT • MICROCMS •
                      </textPath>
                    </text>
                  </svg>
                  <b>NB</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section skills" id="skills">
          <div className="container">
            <div className="sec-head">
              <span className="sec-head__num">02</span>
              <SplitText as="h2" className="sec-head__title" text="Skills" />
              <p className="sec-head__lead" data-reveal>
                フロントエンドからバックエンド、デザインまで。
              </p>
            </div>
            <div className="skills__grid" onPointerMove={onSkillMove}>
              {SKILLS.map((s) => (
                <div className="skill" data-skill key={s.name}>
                  <div className="skill__icon">
                    <img src={s.img} alt={s.name} loading="lazy" />
                  </div>
                  <div className="skill__name">{s.name}</div>
                  <div className="skill__tag">{s.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="blog" id="blog">
          <div className="blog__pin">
            <div className="container">
              <div className="sec-head">
                <span className="sec-head__num">03</span>
                <SplitText as="h2" className="sec-head__title" text="Blog" />
                <p className="sec-head__lead" data-reveal>
                  ヘッドレスCMS「microCMS」で管理している記事を、新しい順に表示しています。
                </p>
              </div>
            </div>
            <div className="blog__scroller">
              <div className="blog__track" ref={trackRef}>
                {posts.slice(0, HOME_POSTS).map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
                <Link href="/articles" className="post post--more">
                  <span>
                    View
                    <br />
                    All Posts
                  </span>
                  <span className="btn" style={{ fontSize: 14 }}>
                    Blog
                  </span>
                </Link>
              </div>
            </div>
            <div className="blog__bar">
              <i />
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getBlogs()
  return {
    props: { posts },
    // microCMS で記事を公開すると、最長60秒でトップページに反映
    revalidate: 60,
  }
}
