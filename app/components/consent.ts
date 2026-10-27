'use client'

import { useMemo, useSyncExternalStore } from 'react'

/*
 * Cookietoestemming per categorie. "Noodzakelijk" staat altijd aan en hoeft niet
 * te worden opgeslagen. De keuze staat in localStorage; null = nog niet gekozen.
 */
export type Consent = { analytics: boolean; external: boolean }

const KEY = 'telesto-cookie-consent-v2'
const CHANGE_EVENT = 'telesto:consent-change'
export const OPEN_EVENT = 'telesto:cookie-settings'

const readRaw = (): string | null => {
  try {
    return window.localStorage.getItem(KEY)
  } catch {
    return null
  }
}

const parse = (raw: string | null): Consent | null => {
  if (!raw) return null
  try {
    const v = JSON.parse(raw)
    return { analytics: v.analytics === true, external: v.external === true }
  } catch {
    return null
  }
}

export const readConsent = (): Consent | null => parse(readRaw())

export function writeConsent(consent: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent))
  } catch {
    /* opslag geblokkeerd: de keuze geldt dan alleen voor deze pagina */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE_EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

/** Huidige keuze (null = nog niet gekozen). Op de server altijd null. */
export function useConsent(): Consent | null {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null)
  return useMemo(() => parse(raw), [raw])
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT))
