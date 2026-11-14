import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

/**
 * 1グループ分の幅だけ動かしてループ（継ぎ目なし）。
 * スクロール速度に応じて滑らかに加速、ホバーでゆっくり減速。
 */
export default function Marquee({ items }: { items: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track || prefersReducedMotion()) return

    track.classList.add('is-js')
    const group = track.querySelector<HTMLElement>('.marquee__group')
    if (!group) return

    const BASE = 60 // px / 秒
    let groupW = group.offsetWidth
    let x = 0
    let boost = 0
    let hoverScale = 1
    let hoverTarget = 1
    let lastY = window.scrollY
    let lastT = performance.now()
    let raf = 0

    const measure = () => (groupW = group.offsetWidth)
    const onEnter = () => (hoverTarget = 0.15)
    const onLeave = () => (hoverTarget = 1)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointerleave', onLeave)

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05)
      lastT = now
      const v = Math.abs(window.scrollY - lastY) / Math.max(dt, 0.001)
      lastY = window.scrollY
      boost += (Math.min(v * 0.25, 600) - boost) * 0.08
      hoverScale += (hoverTarget - hoverScale) * 0.08
      x -= (BASE + boost) * hoverScale * dt
      if (groupW > 0) x = ((x % groupW) - groupW) % groupW
      track.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const group = (key: string) => (
    <div className="marquee__group" key={key}>
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )

  return (
    <div className="marquee" ref={wrapRef} aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {group('a')}
        {group('b')}
      </div>
    </div>
  )
}
