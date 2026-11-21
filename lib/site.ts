export const SITE = {
  name: 'NEXT BASE',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextbase-gsap.vercel.app',
  description:
    'Next.js・TypeScript・microCMS で制作したWeb制作ポートフォリオサイト NEXT BASE。GSAP のスクロールアニメーションとヘッドレスCMSのブログを組み込んでいます。',
  tagline: 'Next.js & TypeScript & microCMS',
  github: 'https://github.com/shim369/Nextjs-TypeScript-Newt-Site',
} as const

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const

export const SISTERS = [
  { name: 'NUXT BASE', href: 'https://nuxtbase-gsap.vercel.app/' },
  { name: 'GATSBY BASE', href: 'https://gatsbybase.vercel.app/' },
  { name: 'ASTRO BASE', href: 'https://astrobase.vercel.app/' },
] as const
