'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SplitHeading from '../components/SplitHeading'

/*
 * Full-screen values stage. The active value opens inside one anchored text column while the
 * photo crossfades. Without hover each value gets AUTO_MS, and a bronze rail beside the list
 * fills top to bottom, one segment per value. Hovering a value selects it and pauses the cycle.
 */

const AUTO_MS = 6000

const VALUES = [
  {
    title: 'Onafhankelijk',
    lead: 'Wij zoeken in de hele markt.',
    body: 'Geen merk, dealer of importeur achter ons en geen verborgen commissies. Bij elk advies weegt maar één belang mee: dat van jou.',
    image: '/images/home/parallax-werkplaats.jpg',
    focus: 'object-[45%_center] lg:object-[70%_center]',
  },
  {
    title: 'Persoonlijk',
    lead: 'Eén vast aanspreekpunt.',
    body: 'Iemand die je situatie kent, je wensen onthoudt en gewoon bereikbaar is. Van de eerste vraag tot de sleutel in je hand.',
    image: '/images/reviews/review-4.jpg',
    focus: 'object-[55%_center] lg:object-[75%_center]',
  },
  {
    title: 'Transparant',
    lead: 'Ook wat je liever niet hoort.',
    body: 'Past een auto niet bij je budget of rijgedrag, dan zeggen we dat eerlijk. Ook als dat betekent dat we verder zoeken.',
    image: '/images/reviews/review-1.jpg',
    focus: 'object-[35%_center] lg:object-[65%_center]',
  },
  {
    title: 'Specialist in EV & hybride',
    lead: 'Echte cijfers voor jouw ritten.',
    body: 'Laadgemak, actieradius, subsidies en de werkelijke kosten per kilometer. Zo kies je met cijfers, niet op gevoel.',
    image: '/images/reviews/review-3.jpg',
    focus: 'object-[58%_center] lg:object-[70%_center]',
  },
]

export default function ValuesStage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % VALUES.length), AUTO_MS)
    return () => window.clearTimeout(t)
  }, [active, paused, inView])

  return (
    <section ref={sectionRef} aria-label="Waar wij voor staan" className="relative -mt-px bg-footer">
      <div className="relative">
        <div className="relative min-h-[100svh] overflow-hidden">
          {VALUES.map((v, i) => (
            <div
              key={v.image}
              aria-hidden="true"
              className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                i === active ? 'scale-100 opacity-100' : 'scale-[1.08] opacity-0'
              }`}
            >
              <Image src={v.image} alt="" fill sizes="100vw" className={`object-cover ${v.focus}`} />
            </div>
          ))}
          <div aria-hidden="true" className="absolute inset-0 bg-footer/45 lg:bg-transparent" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-footer/95 via-footer/60 to-footer/0 lg:via-footer/55" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-footer/60" />

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-container items-center px-6 pb-8 pt-20 lg:pb-10 lg:pt-24">
            <div className="w-full max-w-xl">
              <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                Onze waarden
              </p>
              <SplitHeading
                lines={['Waar wij voor staan']}
                className="mt-3 text-balance font-serif text-4xl/[1.3] font-light uppercase text-white sm:text-5xl/[1.3]"
              />

              <div className="relative mt-8 pl-6 sm:mt-12 sm:pl-8">
                <ol
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setPaused(false)
                  }}
                >
                  {VALUES.map((v, i) => {
                    const on = i === active
                    return (
                      <li
                        key={v.title}
                        onPointerEnter={(e) => {
                          if (e.pointerType !== 'mouse') return
                          setActive(i)
                          setPaused(true)
                        }}
                        className="relative pb-4 last:pb-0 sm:pb-5"
                      >
                        <span aria-hidden="true" className="absolute inset-y-0 -left-6 w-px bg-white/15 sm:-left-8" />
                        <span
                          key={on && !paused ? `run-${active}` : `static-${i}-${on}-${paused}`}
                          aria-hidden="true"
                          className="absolute inset-y-0 -left-6 w-px origin-top bg-bronze sm:-left-8"
                          style={
                            on && !paused
                              ? { animation: `value-rail-fill ${AUTO_MS}ms linear forwards` }
                              : { transform: `scaleY(${i < active || (on && paused) ? 1 : 0})` }
                          }
                        />
                        <h3>
                          <button
                            type="button"
                            onClick={() => setActive(i)}
                            onFocus={() => setPaused(true)}
                            onBlur={() => setPaused(false)}
                            aria-expanded={on}
                            className={`text-left font-sans text-2xl/[1.2] font-light uppercase tracking-[0.04em] transition-colors duration-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:text-3xl/[1.2] lg:text-4xl/[1.2] ${
                              on ? 'text-white' : 'text-white/40 hover:text-white/70'
                            }`}
                          >
                            {v.title}
                          </button>
                        </h3>
                        <div
                          className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                            on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div
                              className={`pb-1 pt-3 transition-opacity duration-500 motion-reduce:transition-none ${
                                on ? 'opacity-100 delay-200' : 'opacity-0'
                              }`}
                            >
                              <p className="text-lg text-[#C9A87A] sm:text-xl">{v.lead}</p>
                              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-white/75 sm:text-lg">{v.body}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
