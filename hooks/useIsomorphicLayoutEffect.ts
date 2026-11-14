import { useEffect, useLayoutEffect } from 'react'

/** SSR 時の警告を避けつつ、クライアントでは描画前に GSAP を初期化する */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
