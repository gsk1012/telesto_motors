'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SplitHeading from '../components/SplitHeading'

/*
 * "Scroll-podium": a tall track with a sticky full-screen stage. Scrolling through the
 * track steps through the values; the photo crossfades and settles, the active value opens
 * inside one anchored text column and a bronze rail beside the list fills with progress.
 * Progress is read in a rAF loop that only runs while the track is on screen and writes the
 * rail straight to the DOM; React state only changes when the active value changes.
 */

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
  const trackRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    let running = false
    let current = 0

    const update = () => {
      const rect = track.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      const next = Math.min(VALUES.length - 1, Math.floor(progress * VALUES.length))
      if (next !== current) {
        current = next
        setActive(next)
      }
      if (railRef.current) railRef.current.style.transform = `scaleY(${progress})`
      raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(update)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(track)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  function goTo(i: number) {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const travel = track.offsetHeight - window.innerHeight
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: top + travel * ((i + 0.5) / VALUES.length), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section aria-label="Waar wij voor staan" className="relative bg-footer">
      <div ref={trackRef} className="relative h-[340svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
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

          <div className="relative z-10 mx-auto flex h-full max-w-container items-center px-6 pb-8 pt-20 lg:pb-10 lg:pt-24">
            <div className="w-full max-w-xl">
              <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                Onze waarden
              </p>
              <SplitHeading
                lines={['Waar wij voor staan']}
                className="mt-3 text-balance font-serif text-4xl/[1.3] font-light uppercase text-white sm:text-5xl/[1.3]"
              />

              <div className="relative mt-8 pl-6 sm:mt-12 sm:pl-8">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-white/15" />
                <span
                  ref={railRef}
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px origin-top bg-bronze"
                  style={{ transform: 'scaleY(0)' }}
                />
                <ol className="space-y-4 sm:space-y-5">
                  {VALUES.map((v, i) => {
                    const on = i === active
                    return (
                      <li key={v.title}>
                        <h3>
                          <button
                            type="button"
                            onClick={() => goTo(i)}
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1.5 sm:bottom-8"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">Scroll</span>
            <svg
              className="animate-scroll-arrow h-6 w-6 text-bronze"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
