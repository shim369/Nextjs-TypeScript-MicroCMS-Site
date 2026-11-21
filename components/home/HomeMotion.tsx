'use client'

import { useRef, useState, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

// ローダーは最初の訪問時だけ再生（クライアント遷移で戻ってきたときは省略）
let introPlayed = false

export default function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [showLoader] = useState(() => !introPlayed)
  // StrictMode / Activity で effect が再実行されても、初回描画時の判定を使う
  const playLoaderRef = useRef(showLoader)

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      const playLoader = playLoaderRef.current && !reduce
      introPlayed = true
      playLoaderRef.current = false

      if (reduce) {
        gsap.set('.loader', { display: 'none' })
        return
      }

      // Loader → Hero intro
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      if (playLoader) {
        intro
          .from('.loader__logo span', { yPercent: 110, duration: 1, stagger: 0.08 })
          .to('.loader__bar', { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=.4')
          .to('.loader__logo', { yPercent: -20, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
          .to('.loader__panel', { scaleY: 0, duration: 0.9, ease: 'expo.inOut' }, '-=.2')
          .set('.loader', { display: 'none' })
      } else {
        gsap.set('.loader', { display: 'none' })
      }
      intro
        .from('.hero__media', { autoAlpha: 0, duration: 1.6, ease: 'power2.out' }, playLoader ? '-=.5' : 0)
        .from('.hero__img', { scale: 1.15, duration: 2.2 }, '<')
        .from('.hero__title .char', { yPercent: 115, duration: 1.2, stagger: 0.03 }, '<.2')
        .from('[data-hero]', { y: 20, autoAlpha: 0, duration: 1, stagger: 0.15 }, '<.6')
        .from('.hero__stripe', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, '<')

      // Hero parallax
      const heroScroll = () => ({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true })
      gsap.to('.hero__img', { yPercent: -10, ease: 'none', scrollTrigger: heroScroll() })
      gsap.to('.hero__inner', { yPercent: 20, autoAlpha: 0, ease: 'none', scrollTrigger: heroScroll() })

      // Flow: 項目が順に浮き上がる
      gsap.from('.flow__item', {
        y: 32,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.flow', start: 'top 85%' },
      })

      // About: クリップ表示 + パララックス + バッジ
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
        }
      )
      gsap.from('.about__badge', {
        scale: 0,
        rotate: -90,
        duration: 1.2,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.about__visual', start: 'top 60%' },
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
      const track = root.current?.querySelector<HTMLElement>('.blog__track')
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
    },
    { scope: root }
  )

  return (
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
      {children}
    </div>
  )
}
