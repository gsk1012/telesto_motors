'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { NavLink } from './nav'
import { PHONE_DISPLAY, PHONE_HREF, INSTAGRAM_HREF, FACEBOOK_HREF } from './nav'
import { InstagramGlyph, FacebookGlyph, PhoneGlyph, SocialIconLink } from './SocialIcons'

interface DesktopMenuProps {
  links: NavLink[]
  logoHref?: string
  ctaHref?: string
}

/* Desktop "MENU": opent bij klik een curtain-paneel vanaf links met exact
   dezelfde veeg-animatie als het mobiele menu — de breedte veegt open van
   0 → eindbreedte terwijl de inhoud op zijn eindpositie blijft staan. Naar body
   geportald zodat de backdrop-filter van de header het paneel nooit clipt. */
export default function DesktopMenu({ links, logoHref = '/', ctaHref = '#contact' }: DesktopMenuProps) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  // Zelfde scroll-drempel als StickyNav zodat de zwevende MENU-knop exact op de
  // header-knop blijft liggen wanneer de nav bij het scrollen krimpt.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // De MENU-knop. We renderen 'm twee keer: één keer in de header (voor de
  // layout naast de snelkoppelingen) en één identieke kopie in de portal, die
  // boven het open paneel zweeft (z-[60]) zodat 'de logo naar rechts, MENU
  // blijft staan' klopt en tegelijk als sluitknop werkt (X-morph).
  const trigger = (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      className="btn-label relative flex items-center gap-3 rounded-full border border-bronze/60 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 transition-colors duration-300 ease-out hover:border-bronze hover:text-white"
    >
      {/* Drie balken die op open naar een X morphen */}
      <span aria-hidden className="relative flex h-3.5 w-5 flex-col justify-between">
        <span
          className={`h-[2px] w-full rounded-full bg-bronze transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            open ? 'translate-y-[6px] rotate-45' : ''
          }`}
        />
        <span
          className={`h-[2px] w-full rounded-full bg-bronze transition-opacity duration-200 motion-reduce:transition-none ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`h-[2px] w-full rounded-full bg-bronze transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            open ? '-translate-y-[6px] -rotate-45' : ''
          }`}
        />
      </span>
      Menu
    </button>
  )

  return (
    <>
      {trigger}

      {mounted &&
        createPortal(
          <div className="hidden lg:block">
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-[800ms] ${
                open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />

            {/* Curtain vanaf links: breedte veegt open, inhoud blijft op eindpositie */}
            <div
              inert={!open}
              className={`fixed inset-y-0 left-0 z-50 overflow-hidden backdrop-blur-xl transition-[width] duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none ${
                open ? 'w-[min(90vw,26rem)]' : 'w-0'
              }`}
              style={{ backgroundColor: 'rgba(17,17,17,0.65)' }}
            >
              <div className="absolute inset-y-0 left-0 flex w-[min(90vw,26rem)] flex-col">
                {/* Bovenbalk: logo rechts — de zwevende MENU-knop (portal) neemt
                    links de plek in en dient tegelijk als sluitknop. */}
                <div className="flex items-center justify-end px-10 pt-8">
                  <a href={logoHref} onClick={() => setOpen(false)} className="flex w-fit items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/telesto-logo-color.svg" alt="Telesto Motors" className="h-16 w-auto" />
                  </a>
                </div>

                {/* Links */}
                <nav className="mt-6 flex flex-col px-10">
                  {links.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      style={{
                        transitionProperty: 'opacity, transform, color',
                        transitionDuration: '900ms, 900ms, 250ms',
                        transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                        transitionDelay: open ? `${250 + i * 130}ms, ${250 + i * 130}ms, 0ms` : '0ms',
                      }}
                      className={`border-b border-white/10 py-4 text-xl font-medium uppercase tracking-wide text-white/75 hover:text-bronze last:border-0 motion-reduce:transition-none ${
                        open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* CTA + contact/socials (identiek aan het mobiele curtain-menu) */}
                <div
                  style={{ transitionDelay: open ? `${250 + links.length * 130}ms` : '0ms' }}
                  className={`mt-auto px-10 pb-10 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                  }`}
                >
                  <a
                    href={ctaHref}
                    onClick={() => setOpen(false)}
                    className="btn-gold btn-label block rounded-full px-6 py-3.5 text-center text-base font-semibold"
                  >
                    Afspraak maken
                  </a>
                  <div className="mt-6 flex items-center justify-between">
                    <a
                      href={PHONE_HREF}
                      className="flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors duration-300 ease-out hover:text-white"
                    >
                      <PhoneGlyph className="h-4 w-4 text-bronze" />
                      {PHONE_DISPLAY}
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
                </div>
              </div>
            </div>

            {/* Zwevende kopie van de MENU-knop: ligt op exact dezelfde plek als
                de header-knop (zelfde container + padding), maar boven het paneel
                (z-[60]). De wrapper vangt geen klikken; alleen de knop zelf. */}
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
              <div
                className={`mx-auto flex max-w-container px-6 transition-[padding] duration-300 ease-out lg:px-8 ${
                  scrolled ? 'py-5 lg:py-8' : 'py-7 lg:py-11'
                }`}
              >
                <span className="pointer-events-auto">{trigger}</span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
