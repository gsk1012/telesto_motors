'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SplitHeading from './SplitHeading'

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

  // Eén trigger voor de hele lijst, zodat alle titels tegelijk revealen
  // zodra de sectie in beeld komt — niet pas na doorscrollen per rij.
  const listRef = useRef<HTMLDivElement>(null)
  const [listVisible, setListVisible] = useState(false)
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setListVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="belofte" className="bg-[#14181E] text-white">
      <div className="mx-auto max-w-container px-6 pt-20 pb-14 sm:pb-16 lg:pb-20">
        <p
          className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze"
          data-delay="0s"
        >
          Onze beloftes
        </p>

        {/* Hover-accordion */}
        <div ref={listRef} className="animate-on-scroll mt-2" data-delay="0.1s">
          {PROMISES.map((p, i) => {
            const isActive = active === i
            return (
              <div
                key={p.title}
                onMouseEnter={canHover ? () => setActive(i) : undefined}
                onFocus={canHover ? () => setActive(i) : undefined}
                className={`relative ${i > 0 ? 'border-t-2 border-white/60' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  aria-expanded={isActive}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                >
                  <SplitHeading
                    as="h3"
                    lines={[p.title]}
                    revealed={listVisible}
                    className={`font-serif text-xl font-light transition-colors duration-300 sm:text-2xl lg:text-3xl ${
                      isActive ? 'text-white' : 'text-white/40'
                    }`}
                  />
                  <span
                    className="btn-gold flex h-10 w-10 flex-none items-center justify-center rounded-full sm:h-12 sm:w-12"
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

                {/* Uitklapbare inhoud (grid-rows truc voor vloeiend openklappen).
                    `relative` zodat de desktop-foto als losse laag kan hangen. */}
                <div
                  className={`relative grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[grid-template-rows] ${
                    isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div
                    className={`overflow-hidden transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="pb-14 sm:pb-20">
                      {/* Mobiel: rechte foto boven de tekst, volle breedte. */}
                      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden shadow-2xl shadow-black/50 lg:hidden">
                        <Image
                          src={p.image}
                          alt={p.alt}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <p
                        key={isActive ? 'open' : 'closed'}
                        className={`max-w-xl text-[1.0625rem] leading-relaxed text-white/70 ${isActive ? 'animate-fade-up-slow' : ''}`}
                      >
                        <span className="font-semibold text-white">{p.lead} </span>
                        {p.body}
                      </p>
                      <a
                        href="#contact"
                        className="btn-gold btn-label mt-4 inline-flex w-fit items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
                      >
                        Plan een gesprek
                      </a>
                    </div>
                  </div>

                  {/* Desktop: gekantelde foto als losse laag. Doet niet mee aan de
                      hoogte-animatie en wordt nooit afgekapt — hij fadet puur mee
                      met het paneel, dus geen harde clip of nasleep bij wisselen. */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-[55%] hidden aspect-[4/5] w-[21rem] overflow-hidden shadow-2xl shadow-black/50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(4deg)] lg:block ${
                      i === 0 ? 'top-[-6rem]' : 'top-[-9rem]'
                    } ${isActive ? 'opacity-100 delay-150' : 'opacity-0 delay-0'}`}
                  >
                    <Image src={p.image} alt="" fill sizes="21rem" className="object-cover" />
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
