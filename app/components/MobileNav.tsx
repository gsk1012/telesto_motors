'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { NavLink } from './StickyNav'
import { InstagramGlyph, FacebookGlyph, PhoneGlyph, SocialIconLink } from './SocialIcons'
import { PHONE_DISPLAY, PHONE_HREF, INSTAGRAM_HREF, FACEBOOK_HREF, DEFAULT_NAV } from './nav'

const DEFAULT_LINKS: NavLink[] = DEFAULT_NAV

interface MobileNavProps {
  links?: NavLink[]
  ctaHref?: string
  /** Controlled open state, zodat de StickyNav weet wanneer het menu open is. */
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* Three bars that morph into an X in place: outer bars rotate to the
   diagonals, the middle bar fades out. */
function BurgerBars({ open }: { open: boolean }) {
  const bar =
    'absolute h-[3px] w-7 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
  return (
    <span aria-hidden="true" className="relative flex h-7 w-7 items-center justify-center">
      <span className={`${bar} ${open ? 'rotate-45' : '-translate-y-[8px]'}`} />
      <span className={`${bar} ${open ? 'scale-x-0 opacity-0' : ''}`} />
      <span className={`${bar} ${open ? '-rotate-45' : 'translate-y-[8px]'}`} />
    </span>
  )
}

export default function MobileNav({
  links = DEFAULT_LINKS,
  ctaHref = '#contact',
  open,
  onOpenChange,
}: MobileNavProps) {
  const [mounted, setMounted] = useState(false)
  const scrollY = useRef(0)

  // Portal target (document.body) only exists on the client; mount after hydration.
  useEffect(() => setMounted(true), [])

  const openMenu = () => {
    scrollY.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY.current}px`
    document.body.style.width = '100%'
    onOpenChange(true)
  }

  const closeMenu = () => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    // De pagina staat na het opheffen van de lock even bovenaan. Herstel de
    // scrollpositie DIRECT: anders animeert `html { scroll-behavior: smooth }`
    // de sprong vanaf de hero terug naar de sectie waar je was.
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, scrollY.current)
    html.style.scrollBehavior = prev
    onOpenChange(false)
  }

  return (
    <>
      {/* Static stand-in until hydration; the interactive button is portaled
          to <body> at the exact same coordinates so it can float above the
          open panel without ever moving. */}
      {!mounted && (
        <div className="flex h-10 w-10 items-center justify-center text-white lg:hidden">
          <BurgerBars open={false} />
        </div>
      )}
      {mounted && <div className="h-10 w-10 lg:hidden" aria-hidden="true" />}

      {/* Overlay is portaled to <body> so the header's backdrop-filter (added on
          scroll) never becomes its containing block and clips/delays it. */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              onClick={closeMenu}
              className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-[800ms] lg:hidden ${
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Curtain panel: the width sweeps open over 0.8s while the content
                stays anchored at its final position, so it is revealed by the
                moving edge instead of sliding along (reijndersvanvliet-style). */}
            <div
              inert={!open}
              className={`fixed inset-y-0 right-0 z-50 overflow-hidden backdrop-blur-xl transition-[width] duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none lg:hidden ${
                open ? 'w-[min(80vw,20rem)]' : 'w-0'
              }`}
              style={{ backgroundColor: 'rgba(17,17,17,0.65)' }}
            >
              <div className="absolute inset-y-0 right-0 flex w-[min(80vw,20rem)] flex-col">
                {/* Header (mirrors the page nav so the toggle lines up with it) */}
                <div className="flex items-center px-6 py-5">
                  <img src="/images/telesto-logo-color.svg" alt="Telesto Motors" className="h-16 w-auto" />
                </div>

                {/* Links */}
                <nav className="mt-2 flex flex-col px-8">
                  {links.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      style={{
                        transitionProperty: 'opacity, transform, color',
                        transitionDuration: '900ms, 900ms, 250ms',
                        transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                        transitionDelay: open ? `${250 + i * 130}ms, ${250 + i * 130}ms, 0ms` : '0ms',
                      }}
                      className={`border-b border-white/10 py-4 text-lg font-medium uppercase tracking-wide text-white/75 hover:text-bronze last:border-0 motion-reduce:transition-none ${
                        open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* CTA + contact/socials */}
                <div
                  style={{ transitionDelay: open ? `${250 + links.length * 130}ms` : '0ms' }}
                  className={`mt-auto px-6 pb-10 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                  }`}
                >
                  <a
                    href={ctaHref}
                    onClick={closeMenu}
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

            {/* Toggle: one button, one spot. It sits above the panel (z-60) at
                the same coordinates as the in-flow stand-in (nav px-6/py-5 with
                the h-16 logo centers a 40px button at top-8 right-6). */}
            <button
              type="button"
              onClick={open ? closeMenu : openMenu}
              aria-label={open ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={open}
              className="fixed right-6 top-8 z-[60] flex h-10 w-10 items-center justify-center text-white lg:hidden"
            >
              <BurgerBars open={open} />
            </button>
          </>,
          document.body,
        )}
    </>
  )
}
