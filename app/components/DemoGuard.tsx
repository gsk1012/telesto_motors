'use client'

import { useEffect } from 'react'

/*
 * CLIENT-DEMO modus (alleen op de branch 'client-demo').
 *
 * Alle functionaliteit van de homepage blijft werken (MENU-paneel, Calendly,
 * WhatsApp, in-page scrollen, formulieren, socials, telefoon). Het enige dat
 * geblokkeerd wordt: navigeren naar een ándere pagina. Toegestaan blijven de
 * homepage ('/'), het privacybeleid ('/privacybeleid') en de pakketten-pagina
 * ('/plans'); alle overige interne paginalinks doen niets. Externe links
 * (http, tel, mail, WhatsApp, Instagram) en anchors op dezelfde pagina
 * blijven gewoon werken.
 */
const ALLOWED_PATHS = new Set(['/', '/privacybeleid', '/plans'])

export default function DemoGuard() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const anchor = target?.closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }

      // Extern (andere origin) of tel:/mailto: → met rust laten.
      if (url.origin !== window.location.origin) return

      const path = url.pathname.replace(/\/+$/, '') || '/'
      if (ALLOWED_PATHS.has(path)) return // home, privacy of anchor op deze pagina

      // Eigen site, niet-toegestaan pad → navigatie tegenhouden.
      // Capture-fase + stopPropagation blokkeert ook Next.js' client-side router.
      e.preventDefault()
      e.stopPropagation()
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
