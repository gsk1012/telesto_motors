'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { OPEN_EVENT, openCookieSettings, useConsent, writeConsent, type Consent } from './consent'

/*
 * Cookiebanner met toestemming per categorie:
 *  - Noodzakelijk: altijd aan.
 *  - Analytisch: Google Analytics, alleen als NEXT_PUBLIC_GA_ID is ingesteld.
 *  - Externe diensten: de Calendly-agenda (CalendlyWidget leest dezelfde keuze).
 * Zonder toestemming wordt het bijbehorende script of de iframe niet geladen. De
 * keuze is altijd te wijzigen via het icoon linksonder.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Verwijdert de _ga-cookies zodra toestemming wordt ingetrokken.
const clearAnalyticsCookies = () => {
  const host = window.location.hostname
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`
      })
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    }
  })
}

function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
}: {
  checked: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 flex-none rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
        checked ? 'bg-bronze' : 'bg-white/20'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function Row({
  title,
  body,
  children,
}: {
  title: string
  body: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-white/10 py-3.5">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-white/60">{body}</p>
      </div>
      {children}
    </div>
  )
}

export default function CookieConsent() {
  const consent = useConsent()
  const [mounted, setMounted] = useState(false)
  const [forced, setForced] = useState(false)
  const [details, setDetails] = useState(false)
  const [draft, setDraft] = useState<Consent>({ analytics: false, external: false })

  useEffect(() => {
    setMounted(true)
    const reopen = () => {
      setForced(true)
      setDetails(true)
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  // Bij openen starten de schakelaars op de huidige keuze.
  useEffect(() => {
    if (forced) setDraft(consent ?? { analytics: false, external: false })
  }, [forced]) // eslint-disable-line react-hooks/exhaustive-deps

  // Intrekken van analytics: uitzetten en bestaande cookies opruimen.
  useEffect(() => {
    if (!GA_ID || !consent) return
    ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !consent.analytics
    if (!consent.analytics) clearAnalyticsCookies()
  }, [consent])

  if (!mounted) return null

  const open = forced || consent === null
  const save = (next: Consent) => {
    writeConsent(next)
    setForced(false)
    setDetails(false)
  }

  return (
    <>
      {GA_ID && consent?.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {/* Altijd aanwezige knop om de keuze te wijzigen (banner is dan dicht). */}
      {!open && (
        <button
          type="button"
          onClick={openCookieSettings}
          aria-label="Cookie-instellingen"
          title="Cookie-instellingen"
          className="fixed bottom-4 left-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-[#22262E] text-bronze ring-1 ring-bronze/50 transition-colors hover:text-white hover:ring-bronze sm:bottom-6 sm:left-6"
          style={{ boxShadow: 'inset 0 0 14px 0 rgba(166,132,99,0.22), 0 10px 24px -8px rgba(0,0,0,0.5)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1z" />
            <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="14" cy="15" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="8.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
          </svg>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Cookievoorkeuren"
          className="fixed inset-x-4 bottom-4 z-[60] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl bg-[#22262E] p-5 text-white ring-1 ring-bronze/50 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[26rem] sm:p-6"
          style={{ boxShadow: 'inset 0 0 26px 0 rgba(166,132,99,0.22), 0 24px 60px -12px rgba(0,0,0,0.55)' }}
        >
          <p className="font-serif text-lg font-light">Cookies</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Wij gebruiken alleen wat nodig is, en met jouw toestemming ook cookies om de website te
            verbeteren en onze agenda te tonen. Je bepaalt zelf welke.{' '}
            <a href="/cookiebeleid" className="text-bronze underline-offset-2 hover:underline">
              Lees meer
            </a>
          </p>

          {details && (
            <div className="mt-4">
              <Row title="Noodzakelijk" body="Nodig om de website te laten werken. Hier worden geen gegevens gevolgd.">
                <Toggle checked disabled label="Noodzakelijke cookies (altijd aan)" />
              </Row>
              {GA_ID && (
                <Row
                  title="Analytisch"
                  body="Google Analytics laat ons geanonimiseerd zien welke pagina's worden bezocht."
                >
                  <Toggle
                    checked={draft.analytics}
                    onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
                    label="Analytische cookies"
                  />
                </Row>
              )}
              <Row
                title="Externe diensten"
                body="Laadt de afspraakagenda van Calendly, die eigen cookies kan plaatsen."
              >
                <Toggle
                  checked={draft.external}
                  onChange={(v) => setDraft((d) => ({ ...d, external: v }))}
                  label="Externe diensten (Calendly-agenda)"
                />
              </Row>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2.5">
            {details ? (
              <button
                type="button"
                onClick={() => save(draft)}
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
              >
                Keuze opslaan
              </button>
            ) : (
              <button
                type="button"
                onClick={() => save({ analytics: !!GA_ID, external: true })}
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
              >
                Alles accepteren
              </button>
            )}
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => save({ analytics: false, external: false })}
                className="btn-label inline-flex flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/25 transition-colors hover:text-white hover:ring-white/60"
              >
                Alleen noodzakelijk
              </button>
              {!details && (
                <button
                  type="button"
                  onClick={() => {
                    setDraft(consent ?? { analytics: false, external: false })
                    setDetails(true)
                  }}
                  className="btn-label inline-flex flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/25 transition-colors hover:text-white hover:ring-white/60"
                >
                  Voorkeuren
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
