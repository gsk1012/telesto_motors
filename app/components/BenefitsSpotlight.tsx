'use client'

import { useEffect, useRef } from 'react'

/*
 * Interactive benefit grid for the service detail pages.
 * - A soft bronze spotlight tracks the cursor inside each card (CSS vars set
 *   directly on the node, no React state, so no re-render churn).
 * - Each checkmark draws itself in when the card scrolls into view, staggered.
 * Both effects collapse to static under prefers-reduced-motion (handled in CSS).
 */
export default function BenefitsSpotlight({ benefits }: { benefits: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = rootRef.current?.querySelectorAll<HTMLElement>('.benefit-card')
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = Number(el.dataset.index ?? 0)
          const check = el.querySelector('.benefit-check')
          window.setTimeout(() => check?.classList.add('is-drawn'), index * 140)
          observer.unobserve(el)
        })
      },
      { threshold: 0.4 }
    )

    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={rootRef} className="grid h-full gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-5">
      {benefits.map((benefit, i) => (
        <div
          key={benefit}
          data-index={i}
          onMouseMove={handleMove}
          className="benefit-card group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-white to-bronze/[0.05] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-lg sm:p-8"
        >
          <span className="benefit-card__spot" aria-hidden="true" />

          <span className="relative flex h-12 w-12 flex-none items-center justify-center rounded-full bg-bronze/15 text-bronze-dark transition-colors duration-300 group-hover:bg-bronze-dark group-hover:text-white">
            <svg
              className="benefit-check h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>

          <span className="relative text-base font-medium leading-snug text-ink/80">
            {benefit}
          </span>
        </div>
      ))}
    </div>
  )
}
