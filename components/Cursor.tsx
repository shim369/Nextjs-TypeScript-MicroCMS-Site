'use client'

import { useEffect, useRef } from 'react'

/** マウス追従カーソル（PC・ホバー可能な端末のみ） */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = ref.current
    if (!cursor || !window.matchMedia('(hover:hover) and (min-width:901px)').matches) return

    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let tx = cx
    let ty = cy
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null
      cursor.classList.toggle('is-hover', !!t?.closest?.('a,button,.skill'))
    }
    const loop = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      cursor.style.transform = `translate(${cx}px,${cy}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [])

  return <div className="cursor" ref={ref} aria-hidden="true" />
}
