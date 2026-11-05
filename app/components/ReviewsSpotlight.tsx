"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SplitHeading from "./SplitHeading";
import { useInView } from "./useInView";

/*
 * Klantreviews: links (tot de helft van de pagina) een slider waarvan drie
 * reviews tegelijk in beeld staan, rechts de BMW X5 die van rechts naar links
 * vervaagt in het donker. Op kleinere schermen staat de foto zacht achter de
 * slider en zijn er minder kaarten tegelijk zichtbaar.
 *
 * Scroll-snap doet het werk (swipen op touch), de pijlen en de autoplay
 * scrollen er alleen naartoe. Autoplay pauzeert bij hover/focus en buiten
 * beeld, en staat uit bij prefers-reduced-motion.
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

const INTERVAL_MS = 6000;

const initials = (name: string) => {
  const parts = name.split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

function Stars() {
  return (
    <div role="img" className="flex gap-1 text-bronze" aria-label="Beoordeling 5 van de 5 sterren">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ReviewsSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const inView = useInView(sectionRef, "0px");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const step = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | undefined;
    if (!el || !card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const go = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const atStart = el.scrollLeft <= 4;
      if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior });
      else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
      else el.scrollBy({ left: dir * step(), behavior });
    },
    [reduced],
  );

  // Vanzelf doorschuiven; stopt bij hover/focus, buiten beeld en bij reduced motion.
  useEffect(() => {
    if (paused || reduced || !inView) return;
    const id = setInterval(() => go(1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, reduced, inView, go]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-charcoal py-24 sm:py-28 xl:py-32"
    >
      {/* De X5: rechts, vervaagt van rechts naar links in het donker */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-20 w-full opacity-25 xl:-right-[7%] xl:w-[66%] xl:opacity-100"
        style={{
          WebkitMaskImage: "linear-gradient(to left, #000 62%, transparent 100%)",
          maskImage: "linear-gradient(to left, #000 62%, transparent 100%)",
        }}
      >
        <Image
          src="/images/home/parallax-werkplaats.jpg"
          alt=""
          fill
          sizes="(min-width: 1280px) 66vw, 100vw"
          className="object-cover object-[50%_50%]"
        />
      </div>
      {/* Boven en onder zacht in de omliggende secties */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />

      <div className="mx-auto max-w-container px-6">
        <div
          className="xl:w-1/2"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <p
            className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze"
            data-delay="0s"
          >
            Klantervaringen
          </p>
          <SplitHeading
            lines={["Wat onze klanten zeggen"]}
            className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-white sm:text-5xl/[1.3]"
          />
          <p className="animate-on-scroll mt-4 max-w-xl text-lg leading-relaxed text-white/70" data-delay="0.15s">
            Echte ervaringen van mensen die wij aan hun ideale auto hielpen.
          </p>

          {/* Slider */}
          <div className="animate-on-scroll mt-12" data-delay="0.25s">
            <ul
              ref={trackRef}
              role="list"
              aria-label="Klantreviews"
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
            >
              {REVIEWS.map((r) => (
                <li
                  key={r.name}
                  className="flex w-[78%] flex-none snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                >
                  <figure className="flex w-full flex-col rounded-2xl bg-[#22262E]/85 p-6 ring-1 ring-white/10 backdrop-blur-sm">
                    <Stars />
                    <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-white/85">
                      {r.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-bronze/60 text-sm font-semibold text-bronze"
                      >
                        {initials(r.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">{r.name}</span>
                        <span className="block text-xs leading-snug text-white/60">{r.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center gap-3">
              {(["prev", "next"] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(dir === "next" ? 1 : -1)}
                  aria-label={dir === "next" ? "Volgende review" : "Vorige review"}
                  className="btn-gold flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <Arrow dir={dir} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
