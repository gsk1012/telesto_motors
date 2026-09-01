'use client'

import { useState } from 'react'

const CALENDLY_URL =
  'https://calendly.com/bluestardevelopment-info/intake-gesprek-telesto-motors'

/*
 * De iframe wordt pas aangemaakt zodra `active` voor het eerst true is. Daarvoor
 * zou Calendly (plus Stripe, goed voor ~15 requests third-party JS) bij elke
 * homepage-bezoeker meeladen terwijl de agenda-tab dicht staat. Zodra hij er
 * eenmaal is blijft hij gemount, zodat wisselen tussen de tabs niet opnieuw laadt.
 */
export default function CalendlyWidget({ active = true }: { active?: boolean }) {
  const [loaded, setLoaded] = useState(false)

  if (!active) return <div className="min-h-[900px] lg:min-h-[660px]" />

  return (
    <div className="relative overflow-hidden rounded-2xl bg-paper shadow-sm">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-paper">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-bronze/25 border-t-bronze" />
          <p className="text-sm text-ink/50">Agenda laden…</p>
        </div>
      )}
      <iframe
        src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=FDFAF6&text_color=111111&primary_color=C08B5C`}
        className="w-full border-0 min-h-[900px] lg:min-h-[660px]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="Plan een afspraak"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
