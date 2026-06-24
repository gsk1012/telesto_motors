'use client'

import { useState, useEffect } from 'react'
import type { NavLink } from './StickyNav'

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Over ons', href: '#over' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Plannen', href: '/plans' },
  { label: 'Contact', href: '#contact' },
]

interface MobileNavProps {
  links?: NavLink[]
  ctaHref?: string
}

export default function MobileNav({ links = DEFAULT_LINKS, ctaHref = '#contact' }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menu openen"
        className="flex h-10 w-10 items-center justify-center text-white md:hidden"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      <div
        aria-hidden={!open}
        style={{ backgroundColor: '#111111' }}
        className={`fixed inset-0 z-50 flex flex-col transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-5">
          <img src="/images/telesto-logo-color.svg" alt="Telesto Motors" className="h-14 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menu sluiten"
            className="flex h-10 w-10 items-center justify-center text-white/60 transition-colors hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-4 flex flex-col px-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-5 text-2xl font-medium text-white/75 transition-colors hover:text-white last:border-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-auto px-8 pb-12">
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="block rounded-full bg-bronze px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-bronze-dark"
          >
            Afspraak maken
          </a>
        </div>
      </div>
    </>
  )
}
