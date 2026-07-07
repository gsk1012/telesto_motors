'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/* Tijd dat elke belofte in beeld blijft voordat automatisch wordt doorgeschakeld.
   Op mobiel (gestapelde layout) iets rustiger dan op desktop. */
const DURATION_DESKTOP = 2750
const DURATION_MOBILE = 3500

function getDuration() {
  if (typeof window === 'undefined') return DURATION_DESKTOP
  return window.matchMedia('(min-width: 1024px)').matches
    ? DURATION_DESKTOP
    : DURATION_MOBILE
}

/*
 * "Onze belofte" — interactieve kenmerken-showcase.
 *
 * Toont de vier kenmerken van de bestaande site (onafhankelijk persoonlijk
 * advies, aankoopkeuring, de beste deal, veelzijdig en flexibel) in een uniek
 * patroon dat nergens anders op de site terugkomt: een donkere full-bleed band
 * met links een lijst en rechts een fotopaneel dat meewisselt met de actieve
 * rij. De showcase speelt vanzelf af (autoplay) met een doorlopende lijn die
 * langzaam volloopt, en pauzeert bij hover/focus. Alle foto's blijven gemount
 * en crossfaden op opacity, zodat het wisselen vloeiend is.
 */

type Promise = {
  title: string
  body: string
  image: string
  alt: string
}

const PROMISES: Promise[] = [
  {
    title: 'Onafhankelijk persoonlijk advies',
    body: 'Telesto staat klaar om je te helpen de perfecte auto te vinden die aansluit bij jouw wensen en behoeften.',
    image: '/images/kenmerken/advies.webp',
    alt: 'Telesto-adviseur in gesprek met een tevreden klant bij een premium auto',
  },
  {
    title: 'Aankoopkeuring',
    body: 'Voordat je je toekomstige auto koopt, ondergaat deze een grondige technische inspectie door Telesto.',
    image: '/images/kenmerken/aankoopkeuring.webp',
    alt: 'Monteur die met een tablet de motor van een auto keurt',
  },
  {
    title: 'De beste deal',
    body: 'Wanneer je jouw droomauto hebt gekozen, stapt Telesto in de onderhandelingsring voor jou.',
    image: '/images/kenmerken/beste-deal.webp',
    alt: 'Overhandiging van de autosleutel na een geslaagde onderhandeling',
  },
  {
    title: 'Veelzijdig en flexibel',
    body: 'Telesto biedt zowel online ondersteuning als persoonlijke hulp, waardoor je snel en efficiënt geholpen wordt.',
    image: '/images/kenmerken/veelzijdig.webp',
    alt: 'Persoon die auto-advertenties bekijkt op een telefoon, met koffie en sleutels op tafel',
  },
]

export default function PromiseShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const fillRef = useRef<HTMLSpanElement>(null)

  // Autoplay: schakelt vanzelf door naar de volgende belofte. Pauzeert bij
  // hover/focus en staat uit voor gebruikers die minder beweging willen.
  useEffect(() => {
    if (paused) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % PROMISES.length)
    }, getDuration())
    return () => window.clearTimeout(id)
  }, [active, paused])

  // Voortgangslijn: de vulling hangt aan het actieve kenmerk, niet puur aan de
  // tijd. Elk kenmerk beslaat een gelijk deel van de lijn. Tijdens het afspelen
  // groeit de vulling van de bovenkant van het actieve kenmerk naar de onderkant
  // in DURATION. Bij hover/focus springt de lijn direct naar dat kenmerk (ook
  // vooruit naar een kenmerk dat nog niet aan de beurt was) en gaat van daar
  // verder zodra je loslaat.
  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    const n = PROMISES.length
    const start = active / n
    const end = (active + 1) / n
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      el.style.transition = 'none'
      el.style.transform = `scaleY(${end})`
      return
    }
    if (paused) {
      // Snel naar de bovenkant van het gehovererde kenmerk toe animeren.
      el.style.transition = 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = `scaleY(${start})`
      return
    }
    // Afspelen: zet direct op de start van dit kenmerk en groei naar het einde.
    el.style.transition = 'none'
    el.style.transform = `scaleY(${start})`
    void el.offsetHeight // reflow forceren zodat de volgende transition pakt
    el.style.transition = `transform ${getDuration()}ms linear`
    el.style.transform = `scaleY(${end})`
  }, [active, paused])

  return (
    <section id="belofte" className="bg-white text-ink">
      <div className="mx-auto max-w-container px-6 pb-14 pt-14 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        {/* Header */}
        <div className="max-w-2xl">
          <h2
            className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl"
            data-delay="0s"
          >
            Waar je op kunt rekenen
          </h2>
          <p
            className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65"
            data-delay="0.2s"
          >
            Bij Telesto weet je precies wat je krijgt. Geen verrassingen, geen
            verkooppraat. Alleen deze beloftes, van het eerste gesprek tot de
            sleutels in jouw hand.
          </p>
        </div>

        {/* Interactive showcase */}
        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-16">
          {/* Image panel: op mobiel onder de lijst (order-last), op desktop rechts */}
          <div
            className="animate-on-scroll relative order-last aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/11] lg:aspect-auto lg:min-h-[540px]"
            data-delay="0.15s"
          >
            {PROMISES.map((p, i) => (
              <Image
                key={p.image}
                src={p.image}
                alt={p.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={`object-cover transition-opacity duration-700 ease-out ${
                  active === i ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            {/* Actieve titel als onderschrift, vooral nuttig op mobiel */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="font-serif text-2xl font-semibold text-white">
                {PROMISES[active].title}
              </p>
            </div>
          </div>

          {/* Linkerkolom: lijst boven, CTA verankerd aan de onderkant (mt-auto).
              De kolom rekt mee tot de hoogte van de foto, zodat de CTA op de
              vloer van de sectie blijft staan en niet meebeweegt met de lijst. */}
          <div
            className="animate-on-scroll flex flex-col"
            data-delay="0.25s"
          >
            {/* Rail-wrapper: bevat alleen de lijst, zodat de voortgangslijn precies
                zo lang is als de beloftes en niet doorloopt onder de CTA. */}
            <div
              className="relative"
              onPointerLeave={(e) => {
                // Alleen muis pauzeert; op touch is er geen 'leave' om te hervatten.
                if (e.pointerType === 'mouse') setPaused(false)
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
              }}
            >
            {/* Volledige rail-track, altijd zichtbaar van boven naar beneden */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-ink/15"
            />
            {/* Bronzen vulling: hangt aan het actieve kenmerk, aangestuurd via ref */}
            <span
              ref={fillRef}
              aria-hidden
              style={{ transform: 'scaleY(0)' }}
              className="pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top bg-bronze"
            />

            <ul className="flex flex-col">
              {PROMISES.map((p, i) => {
                const isActive = active === i
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onPointerEnter={(e) => {
                        // Alleen muis-hover pauzeert de autoplay; touch niet.
                        if (e.pointerType === 'mouse') {
                          setActive(i)
                          setPaused(true)
                        }
                      }}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className="group block w-full py-5 pl-6 text-left sm:py-6"
                    >
                      <h3
                      className={`font-serif text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                        isActive ? 'text-ink' : 'text-ink/40 group-hover:text-ink/70'
                      }`}
                    >
                      {p.title}
                    </h3>
                    {/* Body vouwt vloeiend open voor de actieve rij (grid-rows truc) */}
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isActive
                          ? 'mt-3 grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-md leading-relaxed text-ink/65">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              )
              })}
            </ul>
            </div>

            {/* CTA linksonder: vult de ruimte naast de hoge foto */}
            <a
              href="#contact"
              className="btn-label mt-10 inline-flex w-fit items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-bronze-dark lg:mt-auto"
            >
              Plan een kennismaking
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
