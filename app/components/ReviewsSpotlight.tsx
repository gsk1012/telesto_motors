"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

/*
 * Klantreviews als peek-slider: het uitgelichte citaat staat groot in beeld,
 * de volgende review komt voor iets minder dan de helft mee — gedimd, als
 * uitnodiging om door te schuiven. Sleep/veeg of gebruik de pijlen. Auto-schuift
 * zachtjes door (pauzeert bij hover/focus), respecteert prefers-reduced-motion.
 *
 * Geen foto's: de linkerhelft is een identiteitspaneel met een groot
 * aanhalingsteken en een monogram (initialen) van de klant.
 */
const REVIEWS = [
  {
    quote:
      "Binnen twee weken hadden ze de juiste auto gevonden. De keuring legde verborgen schade bloot die mij duizenden euro's scheelde.",
    name: "Mark Verhoeven",
    role: "BMW 3-serie",
  },
  {
    quote:
      "Geen verkooppraatjes, alleen eerlijk advies. De onderhandeling deden ze volledig voor mij, scherper dan ik zelf ooit had gekregen.",
    name: "Joost Brinkman",
    role: "Audi Q5, zakelijk",
  },
  {
    quote:
      "Ik wist niets van elektrisch rijden. Ze namen al mijn twijfels weg en kozen een model dat perfect bij mijn dagelijkse ritten past.",
    name: "Sanne de Wit",
    role: "Eerste elektrische auto",
  },
  {
    quote:
      "Persoonlijk en betrokken van het eerste gesprek tot de sleutels. Het voelde alsof iemand echt aan mijn kant stond.",
    name: "Eline Kuipers",
    role: "Gezinsauto",
  },
];

const TOTAL = REVIEWS.length;
// Drie sets achter elkaar → naadloos oneindig doorschuiven (peek blijft altijd).
const LOOP = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const BASE = TOTAL;
const INTERVAL_MS = 5500;

function Stars() {
  return (
    <div className="flex gap-1 text-bronze" aria-label="Beoordeling 5 van de 5 sterren">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReviewsSpotlight() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(BASE); // start in de middelste set
  const [slideW, setSlideW] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const activeDot = (((index - BASE) % BASE) + BASE) % BASE;

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  // Breedte van één slide meten (incl. tussenruimte).
  useEffect(() => {
    const measure = () => {
      const first = trackRef.current?.children[0] as HTMLElement | undefined;
      if (first) setSlideW(first.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Respecteer prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pauzeer wanneer de tab niet zichtbaar is.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Naadloze wrap: na de overgang onzichtbaar terugspringen naar de middelste set.
  // Belangrijk: alleen reageren op de transform-transitie van de track zélf.
  // De kaarten/titels/pijlen hebben eigen (kortere) transitions die omhoog
  // bubbelen; zonder deze filter zou de sprong te vroeg gebeuren en midden in de
  // animatie de slider laten haperen.
  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    if (index >= BASE * 2 || index < BASE) {
      setAnimate(false);
      setIndex(BASE + ((((index - BASE) % BASE) + BASE) % BASE));
    }
  };

  // Overgang weer inschakelen nadat de (onzichtbare) sprong is gezet.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // Auto-schuiven — verse timer na elke wissel, stopt bij pauze/reduced.
  useEffect(() => {
    if (paused || reduced || slideW === 0) return;
    const id = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduced, slideW, next]);

  // Sleep/veeg.
  const swipeX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    swipeX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  return (
    <section className="overflow-hidden bg-charcoal py-24 sm:py-28">
      <div className="mx-auto max-w-container px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <p
            className="animate-on-scroll text-sm font-semibold uppercase tracking-widest text-bronze"
            data-delay="0s"
          >
            Klantervaringen
          </p>
          <h2
            className="animate-on-scroll mt-3 font-serif text-4xl font-light uppercase leading-tight text-white sm:text-5xl"
            data-delay="0.05s"
          >
            Wat onze klanten zeggen
          </h2>
          <p
            className="animate-on-scroll mt-5 text-lg leading-relaxed text-white/65"
            data-delay="0.15s"
          >
            Echte ervaringen van mensen die wij aan hun ideale auto hielpen.
          </p>
        </div>
      </div>

      {/* Peek-slider — de actieve kaart lijnt links uit met de kop, de track
          loopt rechts door tot de schermrand zodat de volgende review
          tegen de rand mee-peekt. --rev-inset = de linkermarge van de container. */}
      <div
        className="animate-on-scroll relative mt-14"
        data-delay="0.2s"
        role="group"
        aria-roledescription="carrousel"
        aria-label="Klantreviews"
        style={{ "--rev-inset": "max(1.5rem, calc((100vw - 1500px) / 2 + 1.5rem))" } as CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Bediening: voortgang + pijlen (uitgelijnd met de container) */}
        <div className="mx-auto mb-8 flex max-w-container items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-4">
            <div className="h-[3px] w-32 overflow-hidden rounded-full bg-white/12 sm:w-44">
              <div
                className="h-full rounded-full bg-bronze transition-[width] duration-500 ease-out"
                style={{ width: `${((activeDot + 1) / TOTAL) * 100}%` }}
              />
            </div>
            <span className="text-sm tabular-nums text-white/45">
              {activeDot + 1} / {TOTAL}
            </span>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Vorige review"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white/75 transition-colors hover:border-bronze hover:bg-bronze hover:text-white"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Volgende review"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white/75 transition-colors hover:border-bronze hover:bg-bronze hover:text-white"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden pb-6"
          style={{ marginLeft: "var(--rev-inset)", width: "calc(100vw - var(--rev-inset))" }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
            <div
              ref={trackRef}
              onTransitionEnd={onTransitionEnd}
              className="flex touch-pan-y select-none [will-change:transform]"
              style={{
                transform: `translate3d(-${index * slideW}px, 0, 0)`,
                transition: animate
                  ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
              }}
            >
              {LOOP.map((r, i) => {
                const isActive = i === index;
                const parts = r.name.split(" ");
                const initials = (
                  parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")
                ).toUpperCase();
                return (
                  <div
                    key={i}
                    aria-hidden={!isActive}
                    className="w-[calc(100vw-var(--rev-inset)-3.5rem)] shrink-0 pr-3 sm:pr-5 lg:w-[min(calc(100vw-var(--rev-inset)-16rem),66rem)] lg:pr-6"
                  >
                    <figure
                      className={`flex h-[440px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm [will-change:transform,opacity] motion-reduce:transition-none sm:h-[400px] lg:grid lg:h-[440px] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] ${
                        animate
                          ? "transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                          : "transition-none"
                      } ${
                        isActive ? "scale-100 opacity-100" : "scale-[0.96] opacity-50"
                      }`}
                    >
                      {/* Identiteitspaneel — vervangt de foto */}
                      <div className="relative flex shrink-0 items-center gap-4 overflow-hidden border-b border-white/10 bg-gradient-to-br from-bronze/25 via-bronze/[0.08] to-transparent px-8 py-7 sm:gap-5 lg:h-full lg:flex-col lg:justify-center lg:gap-7 lg:border-b-0 lg:border-r lg:px-10">
                        <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-bronze/40 bg-white/[0.05] font-serif text-2xl text-bronze sm:h-20 sm:w-20 lg:h-24 lg:w-24 lg:text-4xl">
                          {initials}
                        </div>
                        <div className="relative lg:text-center">
                          <span className="block font-semibold text-white lg:text-lg">{r.name}</span>
                          <span className="block text-sm text-white/55">{r.role}</span>
                        </div>
                      </div>

                      {/* Citaat */}
                      <div className="relative flex flex-1 items-center px-8 py-9 sm:px-10 lg:h-full lg:px-14 lg:py-10">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="pointer-events-none absolute right-8 top-8 hidden h-16 w-16 text-bronze/15 sm:block lg:right-12 lg:top-12 lg:h-20 lg:w-20"
                          aria-hidden
                        >
                          <path d="M9.6 7C6.4 7 4 9.6 4 13.1V19h6.6v-6.6H7.9c0-1.9 1-3 2.8-3.1V7zm9.9 0c-3.2 0-5.6 2.6-5.6 6.1V19H20.5v-6.6h-2.7c0-1.9 1-3 2.8-3.1V7z" />
                        </svg>

                        <div>
                          <Stars />
                          <blockquote className="mt-6 font-serif text-lg font-medium leading-relaxed text-white sm:text-xl lg:text-[1.6rem] lg:leading-relaxed">
                            {r.quote}
                          </blockquote>
                        </div>
                      </div>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
}
