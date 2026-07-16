'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/*
 * "Onze belofte" — hover-accordion showcase.
 *
 * Volledig-breedte rijen met titel + pijl-knop, gescheiden door dunne lijnen.
 * De rij onder de muis (of met focus) klapt open en toont beschrijving,
 * "Lees meer"-knop en een licht gekantelde foto. Op touch-apparaten opent een
 * tik dezelfde rij.
 */

type Promise = {
  title: string
  lead: string
  body: string
  image: string
  alt: string
}

const PROMISES: Promise[] = [
  {
    title: 'Onafhankelijk persoonlijk advies',
    lead: 'De beste auto voor jou.',
    body: 'Telesto staat klaar om je te helpen de perfecte auto te vinden die aansluit bij jouw wensen en behoeften. Of je nu op zoek bent naar een compacte stadsauto, een ruime gezinswagen, of een snelle sportauto, Telesto zorgt ervoor dat je keuze past bij jouw levensstijl, budget en voorkeuren.',
    image: '/images/kenmerken/advies.webp',
    alt: 'Telesto-adviseur in gesprek met een tevreden klant bij een premium auto',
  },
  {
    title: 'Aankoopkeuring',
    lead: 'Technisch in orde.',
    body: 'Voordat je je toekomstige auto koopt, ondergaat deze een grondige technische inspectie door Telesto. Zo weet je precies wat je koopt en kom je nooit voor verrassingen te staan, van de motor tot de kleinste details.',
    image: '/images/kenmerken/aankoopkeuring.webp',
    alt: 'Monteur die met een tablet de motor van een auto keurt',
  },
  {
    title: 'De beste deal',
    lead: 'Nooit te veel betalen.',
    body: 'Wanneer je jouw droomauto hebt gekozen, stapt Telesto voor jou in de onderhandelingsring. Dankzij onze marktkennis en ervaring haal je altijd de scherpste prijs en de beste voorwaarden binnen.',
    image: '/images/kenmerken/beste-deal.webp',
    alt: 'Overhandiging van de autosleutel na een geslaagde onderhandeling',
  },
  {
    title: 'Veelzijdig en flexibel',
    lead: 'Altijd snel bereikbaar.',
    body: 'Telesto biedt zowel online ondersteuning als persoonlijke hulp, waardoor je snel en efficiënt geholpen wordt. Of het nu via een video-afspraak is of een bezoek langs, wij passen ons aan jouw tempo aan.',
    image: '/images/kenmerken/veelzijdig.webp',
    alt: 'Persoon die auto-advertenties bekijkt op een telefoon, met koffie en sleutels op tafel',
  },
]

export default function PromiseShowcase() {
  const [active, setActive] = useState<number | null>(0)
  // Alleen op apparaten die echt kunnen hoveren openen we op mouseenter/focus.
  // Op touch zou dat het tikken verstoren, dus daar telt alleen de klik.
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  return (
    <section id="belofte" className="bg-[#14181E] text-white">
      <div className="mx-auto max-w-container px-6 pt-20 pb-14 sm:pb-16 lg:pb-20">
        <p
          className="animate-on-scroll text-sm font-semibold uppercase tracking-widest text-bronze"
          data-delay="0s"
        >
          Onze beloftes
        </p>

        {/* Hover-accordion */}
        <div className="animate-on-scroll mt-2" data-delay="0.1s">
          {PROMISES.map((p, i) => {
            const isActive = active === i
            return (
              <div
                key={p.title}
                onMouseEnter={canHover ? () => setActive(i) : undefined}
                onFocus={canHover ? () => setActive(i) : undefined}
                className={i < PROMISES.length - 1 ? 'border-b border-white/15' : ''}
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  aria-expanded={isActive}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                >
                  <h3
                    className={`font-serif text-xl font-light transition-colors duration-300 sm:text-2xl lg:text-3xl ${
                      isActive ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <span
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full border transition-colors duration-500 sm:h-12 sm:w-12 ${
                      isActive
                        ? 'border-bronze bg-bronze text-white'
                        : 'border-white/20 text-white/40'
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-500 ease-in-out ${
                        isActive ? 'rotate-[135deg]' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </button>

                {/* Uitklapbare inhoud (grid-rows truc voor vloeiend openklappen) */}
                <div
                  className={`grid transition-all duration-700 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-6 sm:pb-8 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-10">
                      <div>
                        <p className="max-w-md leading-relaxed text-white/70">
                          <span className="font-semibold text-white">{p.lead} </span>
                          {p.body}
                        </p>
                        <a
                          href="#contact"
                          className="btn-label mt-4 inline-flex w-fit items-center justify-center rounded-full bg-bronze px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-dark"
                        >
                          Plan een gesprek
                        </a>
                      </div>
                      <div className="relative mx-auto aspect-[4/3] w-full max-w-xs overflow-hidden shadow-lg [transform:rotate(-1.5deg)] lg:max-w-full">
                        <Image
                          src={p.image}
                          alt={p.alt}
                          fill
                          sizes="(min-width: 1024px) 32vw, 90vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
