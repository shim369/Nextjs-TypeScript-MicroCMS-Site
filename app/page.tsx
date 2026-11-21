import Image from 'next/image'
import Link from 'next/link'
import SplitText from '@/components/SplitText'
import Contact from '@/components/Contact'
import { ArrowRight, GithubIcon } from '@/components/Icons'
import HomeMotion from '@/components/home/HomeMotion'
import SkillsGrid, { type Skill } from '@/components/home/SkillsGrid'
import PostCard from '@/components/blog/PostCard'
import { getBlogs } from '@/lib/microcms'
import { SITE } from '@/lib/site'

const SKILLS: Skill[] = [
  { name: 'Astro', tag: 'SSG', img: '/img/skills/astro.webp' },
  { name: 'JavaScript', tag: 'Language', img: '/img/skills/js.webp' },
  { name: 'Next.js', tag: 'React FW', img: '/img/skills/next.webp' },
  { name: 'Nuxt.js', tag: 'Vue FW', img: '/img/skills/nuxt.webp' },
  { name: 'Python', tag: 'Language', img: '/img/skills/py.webp' },
  { name: 'Django', tag: 'Backend', img: '/img/skills/django.webp' },
  { name: 'microCMS', tag: 'Headless CMS', img: '/img/skills/microcms.webp' },
  { name: 'Figma', tag: 'Design', img: '/img/skills/figma.webp' },
]

// ヒーロー直下の「制作の流れ」
const FLOW = [
  { en: 'Design', tool: 'Figma', text: '目的とターゲットを整理し、構成とデザインを固めます。' },
  { en: 'Develop', tool: 'Next.js / TypeScript', text: '高速でアクセシブルなサイトをコンポーネント単位で実装。' },
  { en: 'Content', tool: 'microCMS', text: 'お知らせやブログを、管理画面から誰でも更新できます。' },
  { en: 'Launch', tool: 'Vercel', text: '公開後も、更新がすぐに反映される仕組みで運用します。' },
]

const HOME_POSTS = 6

export default async function HomePage() {
  const posts = await getBlogs()

  return (
    <HomeMotion>
      {/* Hero */}
      <section className="hero">
        <div className="hero__media">
          <div className="hero__img">
            <Image src="/img/hero.webp" alt="" fill priority sizes="(max-width: 820px) 100vw, 68vw" />
          </div>
        </div>
        <div className="hero__stripe" />
        <div className="hero__inner">
          <h1 className="hero__title" aria-label="Web Development">
            <SplitText className="hero__line" text="Web" />
            <SplitText className="hero__line" text="Development" />
          </h1>
          <p className="hero__sub" data-hero>
            {SITE.tagline}
          </p>
        </div>
        <div className="hero__foot" data-hero>
          <Link href="/#contact" className="hero__link">
            <h2>
              制作のご依頼について
              <ArrowRight />
            </h2>
            <p>Webサイトの新規制作・リニューアルのご相談を承っています。まずはContactからお気軽にお問い合わせください。</p>
          </Link>
        </div>
        <a href="#about" className="hero__scroll" aria-label="Aboutへスクロール" data-hero>
          <span>Scroll</span>
        </a>
      </section>

      {/* Flow */}
      <section className="flow" aria-labelledby="flow-title">
        <h2 id="flow-title" className="flow__heading">
          Workflow
        </h2>
        <ol className="flow__list">
          {FLOW.map((f, i) => (
            <li className="flow__item" key={f.en}>
              <span className="flow__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="flow__title">{f.en}</h3>
              <p className="flow__tool">{f.tool}</p>
              <p className="flow__text">{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

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
                このサイトは<strong>Next.js（App Router）</strong>と<strong>TypeScript</strong>
                をベースに、GSAPのスクロールアニメーションを組み合わせて制作しています。
                <br />
                ブログ記事はヘッドレスCMS「<strong>microCMS</strong>」で管理し、Cache
                Componentsでキャッシュして高速に配信。公開した記事は自動でサイトに反映され、お問い合わせはServer
                Actionからメールで直接届きます。
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
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn" data-reveal>
                <GithubIcon />
                GitHub
              </a>
            </div>
            <div className="about__visual">
              <div className="about__media" data-clip>
                <div className="about__img" data-parallax>
                  <Image src="/img/about.webp" alt="オレンジに光るキーボード" fill sizes="(max-width: 820px) 92vw, 50vw" />
                </div>
              </div>
              <div className="about__badge" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <path id="badgeCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                  </defs>
                  <text fontFamily="var(--font-en)" fontSize="10" fontWeight="600" fill="#fff">
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
          <SkillsGrid skills={SKILLS} />
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
                ヘッドレスCMS「microCMS」で管理している記事から、最新の{HOME_POSTS}件を表示しています。
              </p>
            </div>
          </div>
          <div className="blog__scroller">
            <div className="blog__track">
              {posts.slice(0, HOME_POSTS).map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
              <Link href="/articles" className="post post--more">
                <span>
                  View
                  <br />
                  All Posts
                </span>
                <span className="btn">{posts.length} Posts</span>
              </Link>
            </div>
          </div>
          <div className="blog__bar">
            <i />
          </div>
        </div>
      </section>

      <Contact id="contact" />
    </HomeMotion>
  )
}
