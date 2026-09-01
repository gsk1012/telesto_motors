'use client'

import { useEffect, useState, type RefObject } from 'react'

/*
 * Volgt of een element (deels) in beeld staat. De sliders op de homepage
 * gebruiken dit om hun autoplay-timer stil te zetten zodra ze uit beeld zijn:
 * anders blijft er elke 2 à 5 seconden een re-render van een hele carrousel
 * plaatsvinden terwijl de bezoeker bovenaan de pagina leest.
 *
 * `rootMargin` staat ruim zodat de slider al draait vlak vóór hij in beeld komt
 * en de bezoeker nooit een stilstaande carrousel binnenscrolt.
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '200px',
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
