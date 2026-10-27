'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface FaqItem {
  question: string
  answer: string
  link?: { href: string; label: string }
}

/*
 * FAQ accordion (pakketten). One item open at a time; opening the next one
 * closes the previous. Items expand with a smooth height transition via the
 * grid-template-rows 0fr -> 1fr technique, so the height animates without
 * measuring. Closed panels are `inert`, keeping hidden links out of tab order.
 * Collapses to an instant toggle under prefers-reduced-motion.
 *
 * `variant` switches the skin: `light` (default, cream cards on a light
 * section) or `dark` (translucent cards for use on the charcoal/ink sections).
 */
type Variant = 'light' | 'dark'

const SKIN: Record<Variant, {
  itemBase: string
  borderOpen: string
  borderClosed: string
  question: string
  icon: string
  answer: string
  link: string
}> = {
  light: {
    itemBase: 'bg-cream',
    borderOpen: 'border-bronze/40',
    borderClosed: 'border-ink/10',
    question: 'text-ink',
    icon: 'bg-bronze/10 text-bronze-dark',
    answer: 'text-ink/70',
    link: 'text-bronze-dark hover:text-ink',
  },
  dark: {
    itemBase: 'bg-white/[0.035]',
    borderOpen: 'border-bronze/50',
    borderClosed: 'border-white/10',
    question: 'text-white',
    icon: 'btn-gold',
    answer: 'text-white/70',
    link: 'text-bronze hover:text-white',
  },
}

export default function FaqAccordion({ items, variant = 'light' }: { items: FaqItem[]; variant?: Variant }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const skin = SKIN[variant]

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          /* Static outer wrapper: ScrollAnimator injects a class here at runtime;
             state-driven classes live one level deeper so React never wipes it. */
          <div key={item.question} className="animate-on-scroll" data-delay={`${0.06 + i * 0.06}s`}>
          <div
            className={`rounded-2xl border transition-colors duration-200 ${skin.itemBase} ${
              isOpen ? skin.borderOpen : skin.borderClosed
            }`}
          >
            <h3 className="normal-case">
              <button
                type="button"
                id={`faq-button-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
                className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold sm:px-7 ${skin.question}`}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition-transform duration-200 motion-reduce:transition-none ${skin.icon} ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-6 pb-6 transition-opacity duration-200 motion-reduce:transition-none sm:px-7 ${
                    isOpen ? 'opacity-100 delay-75' : 'opacity-0'
                  }`}
                >
                  <p className={`max-w-[62ch] leading-relaxed ${skin.answer}`}>{item.answer}</p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${skin.link}`}
                    >
                      {item.link.label}
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      })}
    </div>
  )
}
