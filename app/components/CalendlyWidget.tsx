'use client'

const CALENDLY_URL =
  'https://calendly.com/bluestardevelopment-info/intake-gesprek-telesto-motors'

export default function CalendlyWidget() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <iframe
        src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=111111&primary_color=C08B5C`}
        className="w-full border-0"
        style={{ minHeight: 700 }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="Plan een afspraak"
      />
    </div>
  )
}
