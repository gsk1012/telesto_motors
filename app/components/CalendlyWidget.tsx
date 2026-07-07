'use client'

import { useState } from 'react'

const CALENDLY_URL =
  'https://calendly.com/bluestardevelopment-info/intake-gesprek-telesto-motors'

export default function CalendlyWidget() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-bronze/25 border-t-bronze" />
          <p className="text-sm text-ink/50">Agenda laden…</p>
        </div>
      )}
      <iframe
        src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=111111&primary_color=C08B5C`}
        className="w-full border-0 min-h-[900px] lg:min-h-[660px]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="Plan een afspraak"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
