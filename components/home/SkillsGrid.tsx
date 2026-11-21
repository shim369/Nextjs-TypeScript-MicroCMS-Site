'use client'

import Image from 'next/image'
import type { PointerEvent } from 'react'

export type Skill = { name: string; tag: string; img: string }

/** ポインター位置に追従するスポットライト付きのスキル一覧 */
export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.skill')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="skills__grid" onPointerMove={onMove}>
      {skills.map((s) => (
        <div className="skill" data-skill key={s.name}>
          <div className="skill__icon">
            <Image src={s.img} alt="" width={84} height={84} />
          </div>
          <div className="skill__name">{s.name}</div>
          <div className="skill__tag">{s.tag}</div>
        </div>
      ))}
    </div>
  )
}
