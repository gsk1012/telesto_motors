'use client'

import { useState } from 'react'
import { openCookieSettings, useConsent, writeConsent } from './consent'

const CALENDLY_URL =
  'https://calendly.com/telestomotors-info/30min'

/*
 * De iframe wordt pas aangemaakt zodra `active` voor het eerst true is. Daarvoor
 * zou Calendly (plus Stripe, goed voor ~15 requests third-party JS) bij elke
 * homepage-bezoeker meeladen terwijl de agenda-tab dicht staat. Zodra hij er
 * eenmaal is blijft hij gemount, zodat wisselen tussen de tabs niet opnieuw laadt.
 */
export default function CalendlyWidget({ active = true }: { active?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const consent = useConsent()

  if (!active) return <div className="min-h-[780px] lg:min-h-[560px]" />

  // Calendly plaatst eigen cookies: de iframe laadt pas na toestemming.
  if (!consent?.external) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-paper px-6 py-12 text-center shadow-sm">
        <p className="font-serif text-2xl font-light text-ink">Agenda tonen</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
          De afspraakagenda wordt geladen via Calendly, dat eigen cookies kan plaatsen. Geef
          toestemming om de agenda te zien.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => writeConsent({ analytics: consent?.analytics ?? false, external: true })}
            className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold"
          >
            Toon de agenda
          </button>
          <button
            type="button"
            onClick={openCookieSettings}
            className="text-sm font-medium text-ink/55 underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Cookie-instellingen
          </button>
        </div>
      </div>
    )
  }

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
        className="w-full border-0 min-h-[780px] lg:min-h-[560px]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="Plan een afspraak"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
