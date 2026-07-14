'use client'

import { useState, useEffect } from 'react'
import MobileNav from './MobileNav'
import DesktopMenu from './DesktopMenu'
import { InstagramGlyph, FacebookGlyph, PhoneGlyph, SocialIconLink } from './SocialIcons'
import {
  NavLink,
  DEFAULT_NAV,
  QUICK_NAV,
  PHONE_DISPLAY,
  PHONE_HREF,
  INSTAGRAM_HREF,
  FACEBOOK_HREF,
} from './nav'

export type { NavLink }
export { DEFAULT_NAV }

interface StickyNavProps {
  links?: NavLink[]
  quickLinks?: NavLink[]
  logoHref?: string
  ctaHref?: string
  alwaysDark?: boolean
}

export default function StickyNav({
  links = DEFAULT_NAV,
  quickLinks = QUICK_NAV,
  logoHref = '#home',
  ctaHref = '#contact',
  alwaysDark = false,
}: StickyNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled || alwaysDark || menuOpen
          ? 'bg-ink/85 shadow-sm backdrop-blur-md'
          : ''
      }`}
    >
      <nav
        className={`relative mx-auto flex max-w-container items-center justify-between px-6 transition-[padding] duration-300 ease-out lg:px-8 ${
          scrolled ? 'py-5 lg:py-8' : 'py-7 lg:py-11'
        }`}
      >
        {/* LINKS (desktop): MENU-op-hover + snelkoppelingen, zoals de referentie */}
        <div className="hidden items-center gap-2 lg:flex">
          <DesktopMenu links={links} logoHref={logoHref} />
          <ul className="flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2.5 transition-colors duration-300 ease-out hover:text-bronze"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobiel logo (links) — verborgen zolang het curtain-menu open is */}
        <a
          href={logoHref}
          className={`flex items-center transition-opacity duration-200 lg:hidden ${
            menuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/telesto-logo-color.svg"
            alt="Telesto Motors"
            className={`w-auto transition-[height] duration-300 ease-out ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          />
        </a>

        {/* Logo gecentreerd (desktop) */}
        <a
          href={logoHref}
          aria-label="Telesto Motors"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/telesto-logo-color.svg"
            alt="Telesto Motors"
            className={`w-auto transition-[height] duration-300 ease-out ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          />
        </a>

        {/* RECHTS (desktop): telefoon, CTA en socials */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors duration-300 ease-out hover:text-white"
          >
            <PhoneGlyph className="h-6 w-6 text-bronze" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={ctaHref}
            className="btn-label inline-flex items-center justify-center rounded-full bg-bronze px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ease-out hover:bg-bronze-dark"
          >
            Afspraak maken
          </a>
          <div className="flex items-center gap-2">
            <SocialIconLink href={INSTAGRAM_HREF} label="Instagram">
              <InstagramGlyph className="h-[18px] w-[18px]" />
            </SocialIconLink>
            <SocialIconLink href={FACEBOOK_HREF} label="Facebook">
              <FacebookGlyph className="h-[18px] w-[18px]" />
            </SocialIconLink>
          </div>
        </div>

        {/* Mobiel/tablet: curtain-menu (verschijnt onder lg) */}
        <MobileNav
          links={links}
          ctaHref={ctaHref}
          open={menuOpen}
          onOpenChange={setMenuOpen}
        />
      </nav>
    </header>
  )
}
