'use client'

import { useEffect, useRef, useState } from 'react'

const WHATSAPP_NUMBER = '31620779977'
const PREFILLED_MESSAGE = 'Hallo Telesto Motors, ik heb een vraag over...'
// Het venster opent automatisch na deze vertraging wanneer een bezoeker binnenkomt.
const AUTO_OPEN_DELAY = 8_000
// Onthoudt binnen de sessie dat we het al automatisch hebben getoond,
// zodat het niet bij elke pagina-navigatie of refresh opnieuw opengaat.
const AUTO_OPEN_KEY = 'wa-auto-opened'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.97l6.272-1.647A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.575-.478-5.083-1.315l-.364-.214-3.724.977.995-3.635-.236-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  // De popup + auto-open zijn alleen op desktop; op mobiel is de zwevende knop
  // een directe WhatsApp-link (geen popup).
  const [isDesktop, setIsDesktop] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const userInteracted = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Open het venster automatisch één keer per sessie, ~8s nadat de bezoeker
  // binnenkomt — maar niet op mobiel en niet als hij de knop al zelf gebruikte.
  useEffect(() => {
    if (!isDesktop) return
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(AUTO_OPEN_KEY)) return

    const timer = window.setTimeout(() => {
      if (!userInteracted.current) {
        setOpen(true)
        sessionStorage.setItem(AUTO_OPEN_KEY, '1')
      }
    }, AUTO_OPEN_DELAY)

    return () => window.clearTimeout(timer)
  }, [isDesktop])

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const chatHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`

  return (
    <div ref={rootRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat-popup — alleen op desktop */}
      <div
        role="dialog"
        aria-label="WhatsApp chat"
        aria-hidden={!open}
        className={`hidden w-[320px] max-w-[calc(100vw-3rem)] origin-bottom-right overflow-hidden rounded-2xl bg-[#111b21] shadow-2xl ring-1 ring-white/10 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-6 scale-90 opacity-0'
        }`}
      >
          <div className="flex items-center gap-3 bg-[#005c4b] px-4 py-3.5">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Telesto Motors</p>
              <p className="text-xs text-white/70">Meestal binnen een paar uur online</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
              className="ml-auto flex h-7 w-7 flex-none items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="bg-[#0b141a] px-4 py-4">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2.5 shadow">
              <p className="text-sm leading-relaxed text-white/90">
                Hoi! 👋 Waarmee kunnen we je helpen? Stuur ons een bericht en we reageren zo snel mogelijk.
              </p>
            </div>
          </div>

          <div className="bg-[#0b141a] px-4 pb-4">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-[#0b141a] transition-transform duration-200 hover:scale-[1.02]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Start chat
            </a>
          </div>
        </div>

      {/* Zwevende knop. Desktop: opent/sluit de popup. Mobiel: directe WhatsApp-link. */}
      {isDesktop ? (
        <button
          type="button"
          onClick={() => {
            userInteracted.current = true
            sessionStorage.setItem(AUTO_OPEN_KEY, '1')
            setOpen((v) => !v)
          }}
          aria-label={open ? 'WhatsApp venster sluiten' : 'Contacteer ons via WhatsApp'}
          aria-expanded={open}
          className="flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
        >
          <span className="relative flex h-7 w-7 flex-none items-center justify-center">
            <WhatsAppIcon
              className={`absolute h-7 w-7 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <svg
              viewBox="0 0 24 24"
              className={`absolute h-6 w-6 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-white">Contacteer ons</span>
        </button>
      ) : (
        <a
          href={chatHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacteer ons via WhatsApp"
          className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 active:scale-95"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      )}
    </div>
  )
}
