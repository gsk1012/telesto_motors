'use client'

import { useState } from 'react'
import CalendlyWidget from './CalendlyWidget'
import ContactForm from './ContactForm'

type Tab = 'afspraak' | 'bericht'

const TABS: { id: Tab; label: string }[] = [
  { id: 'afspraak', label: 'Plan een afspraak' },
  { id: 'bericht', label: 'Stuur een bericht' },
]

export default function ContactTabs() {
  const [active, setActive] = useState<Tab>('afspraak')

  return (
    <div>
      <div className="mb-8 flex gap-1 rounded-full bg-ink/6 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
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

      {active === 'afspraak' ? <CalendlyWidget /> : <ContactForm />}
    </div>
  )
}
