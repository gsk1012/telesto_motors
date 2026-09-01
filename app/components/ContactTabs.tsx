'use client'

import { useRef, useState } from 'react'
import CalendlyWidget from './CalendlyWidget'
import ContactForm from './ContactForm'

type Tab = 'afspraak' | 'bericht'

const TABS: { id: Tab; label: string }[] = [
  { id: 'bericht', label: 'Stuur een bericht' },
  { id: 'afspraak', label: 'Plan een afspraak' },
]

/*
 * Zet vast een verbinding op naar Calendly zodra de bezoeker richting de
 * agenda-tab beweegt. DNS + TLS staan dan al klaar wanneer hij daadwerkelijk
 * klikt, zodat het uitstellen van de iframe niet als traag voelt.
 */
let warmed = false
function warmCalendly() {
  if (warmed || typeof document === 'undefined') return
  warmed = true
  for (const host of ['https://calendly.com', 'https://assets.calendly.com']) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = host
    link.crossOrigin = ''
    document.head.appendChild(link)
  }
}

export default function ContactTabs() {
  const [active, setActive] = useState<Tab>('bericht')
  // Blijft true zodra de agenda één keer is geopend: de iframe blijft daarna
  // gemount zodat heen-en-weer klikken niet opnieuw laadt.
  const [calendarArmed, setCalendarArmed] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleSelect = (tab: Tab) => {
    if (tab === active) return
    if (tab === 'afspraak') setCalendarArmed(true)
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
            onPointerEnter={tab.id === 'afspraak' ? warmCalendly : undefined}
            onFocus={tab.id === 'afspraak' ? warmCalendly : undefined}
            className={`btn-label flex-1 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
              active === tab.id
                ? 'bg-paper text-ink shadow-sm'
                : 'text-ink/50 hover:text-ink/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Het formulier blijft gemount; Calendly komt er pas bij zodra die tab
          voor het eerst wordt geopend en blijft daarna staan. */}
      <div ref={panelRef} className="scroll-mt-28">
        <div className={active === 'afspraak' ? 'block' : 'hidden'}>
          <CalendlyWidget active={calendarArmed} />
        </div>
        <div className={active === 'bericht' ? 'block' : 'hidden'}>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
