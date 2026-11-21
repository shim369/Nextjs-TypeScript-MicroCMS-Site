'use client'

import { ArrowUp } from './Icons'

export default function ToTop() {
  return (
    <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Page Top
      <span className="to-top__icon">
        <ArrowUp />
      </span>
    </button>
  )
}
