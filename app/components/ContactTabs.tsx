'use client'

import { useRef, useState } from 'react'
import CalendlyWidget from './CalendlyWidget'
import ContactForm from './ContactForm'

type Tab = 'afspraak' | 'bericht'

const TABS: { id: Tab; label: string }[] = [
  { id: 'bericht', label: 'Stuur een bericht' },
  { id: 'afspraak', label: 'Plan een afspraak' },
]

export default function ContactTabs() {
  const [active, setActive] = useState<Tab>('bericht')
  const panelRef = useRef<HTMLDivElement>(null)

  const handleSelect = (tab: Tab) => {
    if (tab === active) return
    setActive(tab)

    // Laat de layout eerst updaten (max-width + zichtbaarheid),
    // scroll daarna de actieve inhoud netjes in het midden.
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const panel = panelRef.current
        if (!panel) return
        // Hoge inhoud (Calendly) bovenaan uitlijnen zodat niets wegvalt,
        // korte inhoud (formulier) netjes centreren.
        const tallerThanViewport = panel.offsetHeight > window.innerHeight
        panel.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: tallerThanViewport ? 'start' : 'center',
        })
      })
    })
  }

  return (
    <div
      className={`mx-auto w-full transition-[max-width] duration-500 ease-out ${
        active === 'bericht' ? 'max-w-2xl' : 'max-w-5xl'
      }`}
    >
      <div className="mb-8 flex gap-1 rounded-full bg-ink/6 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSelect(tab.id)}
            className={`btn-label flex-1 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
              active === tab.id
                ? 'bg-white text-ink shadow-sm'
                : 'text-ink/50 hover:text-ink/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Beide blijven gemount zodat de Calendly-iframe maar één keer laadt */}
      <div ref={panelRef} className="scroll-mt-28">
        <div className={active === 'afspraak' ? 'block' : 'hidden'}>
          <CalendlyWidget />
        </div>
        <div className={active === 'bericht' ? 'block' : 'hidden'}>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
