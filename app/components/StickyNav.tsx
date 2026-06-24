'use client'

import { useState, useEffect } from 'react'
import MobileNav from './MobileNav'

export interface NavLink {
  label: string
  href: string
}

const DEFAULT_NAV: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Over ons', href: '#over' },
  { label: 'Pakketen', href: '/plans' },
  { label: 'Contact', href: '#contact' },
]

interface StickyNavProps {
  links?: NavLink[]
  logoHref?: string
  ctaHref?: string
  alwaysDark?: boolean
}

export default function StickyNav({
  links = DEFAULT_NAV,
  logoHref = '#home',
  ctaHref = '#contact',
  alwaysDark = false,
}: StickyNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 will-change-transform transition-all duration-300 ${
        scrolled || alwaysDark
          ? 'bg-ink/85 shadow-sm backdrop-blur-md'
          : ''
      }`}
    >
      <nav className="mx-auto flex max-w-container items-center justify-between px-6 py-5">
        <a href={logoHref} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/telesto-logo-color.svg"
            alt="Telesto Motors"
            className="h-16 w-auto"
          />
        </a>
        <ul className="hidden items-center gap-9 text-sm font-medium text-white/85 md:flex">
          {links.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={ctaHref}
          className="hidden rounded-full bg-bronze px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-bronze-dark md:inline-flex"
        >
          Afspraak maken
        </a>
        <MobileNav links={links} ctaHref={ctaHref} />
      </nav>
    </header>
  )
}
