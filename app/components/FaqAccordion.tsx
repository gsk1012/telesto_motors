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
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            className={`rounded-2xl border bg-cream transition-colors duration-200 ${
              isOpen ? 'border-bronze/40' : 'border-ink/10'
            }`}
          >
            <h3>
              <button
                type="button"
                id={`faq-button-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink sm:px-7"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full bg-bronze/10 text-bronze-dark transition-transform duration-200 motion-reduce:transition-none ${
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
                  <p className="max-w-[62ch] leading-relaxed text-ink/70">{item.answer}</p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze-dark transition-colors hover:text-ink"
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
