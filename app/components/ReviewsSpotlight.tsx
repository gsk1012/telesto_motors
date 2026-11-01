"use client";

import { type KeyboardEvent, type PointerEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import SplitHeading from "./SplitHeading";
import { useInView } from "./useInView";

/*
 * Klantreviews als sleutelbord: elke review hangt als leren sleutelhanger aan
 * een bronzen rail. Pak een sleutel (klik/tik/pijltjestoetsen) en hij zakt in
 * het licht, terwijl het citaat ernaast verschijnt. De sleutels slingeren echt:
 * een gedempte slinger per sleutel, aangestoten door de muis of door een wissel.
 *
 * Wisselt vanzelf tot de bezoeker zelf een sleutel pakt; pauzeert bij hover/focus
 * en buiten beeld. Bij prefers-reduced-motion geen slinger en geen autoplay.
 */
const REVIEWS = [
  {
    quote:
      "Binnen twee weken hadden ze de juiste auto gevonden. De keuring legde verborgen schade bloot die mij duizenden euro's scheelde.",
    name: "Mark Verhoeven",
    role: "BMW 3-serie",
    tag: ["BMW", "3-SERIE"],
    cord: 22,
  },
  {
    quote:
      "Geen verkooppraatjes, alleen eerlijk advies. De onderhandeling deden ze volledig voor mij, scherper dan ik zelf ooit had gekregen.",
    name: "Joost Brinkman",
    role: "Audi Q5, zakelijk",
    tag: ["AUDI Q5", "ZAKELIJK"],
    cord: 44,
  },
  {
    quote:
      "Ik wist niets van elektrisch rijden. Ze namen al mijn twijfels weg en kozen een model dat perfect bij mijn dagelijkse ritten past.",
    name: "Sanne de Wit",
    role: "Eerste elektrische auto",
    tag: ["EERSTE", "ELEKTRISCHE"],
    cord: 14,
  },
  {
    quote:
      "Persoonlijk en betrokken van het eerste gesprek tot de sleutels. Het voelde alsof iemand echt aan mijn kant stond.",
    name: "Eline Kuipers",
    role: "Gezinsauto",
    tag: ["GEZINSAUTO"],
    cord: 34,
  },
];

const INTERVAL_MS = 6500;
// Zo ver zakt de gepakte sleutel uit de rij (px).
const DROP = 48;
// Slingerconstanten: veerkracht en demping (hoek in graden, tijd in seconden).
const STIFFNESS = 60;
const DAMPING = 1.5;

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

const TAG_PATH =
  "M58 30h24q6 0 9 5l22 30q5 7 5 14v97q0 14-14 14H36q-14 0-14-14V79q0-7 5-14l22-30q3-5 9-5z";

/** Eén keer de verlopen, gedeeld door alle sleutels. */
function KeyDefs() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden>
      <defs>
        <linearGradient id="tm-leather" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B2E24" />
          <stop offset="1" stopColor="#1F1914" />
        </linearGradient>
        <linearGradient id="tm-leather-lit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8C6E50" />
          <stop offset="1" stopColor="#4A3726" />
        </linearGradient>
        <linearGradient id="tm-brass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8C6E50" />
          <stop offset="0.45" stopColor="#E2C99F" />
          <stop offset="1" stopColor="#A68463" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function KeyFob({ review, active }: { review: (typeof REVIEWS)[number]; active: boolean }) {
  return (
    <svg viewBox="0 0 140 300" className="block w-full overflow-visible" aria-hidden>
      {/* Sleutel achter het label */}
      <g transform="rotate(-8 70 16)">
        <path
          d="M63 150h14v82l5 4-5 5 6 5-6 5 5 4-5 5v17l-7 16-7-16z"
          fill="url(#tm-brass)"
        />
        <path d="M69 196v70" stroke="#6E5540" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Ring */}
      <circle cx="70" cy="16" r="13" fill="none" stroke="url(#tm-brass)" strokeWidth="3" />
      <ellipse cx="70" cy="38" rx="7" ry="14" fill="none" stroke="url(#tm-brass)" strokeWidth="2.5" />

      {/* Leren label */}
      <path d={TAG_PATH} fill="url(#tm-leather)" />
      <path
        d={TAG_PATH}
        fill="url(#tm-leather-lit)"
        className={`transition-opacity duration-700 motion-reduce:transition-none ${active ? "opacity-100" : "opacity-0"}`}
      />
      <path
        d={TAG_PATH}
        transform="translate(7 11) scale(.9)"
        fill="none"
        stroke="#E2C99F"
        strokeOpacity=".55"
        strokeWidth="1.3"
        strokeDasharray="5 4"
      />
      <circle cx="70" cy="52" r="6.5" fill="#14181E" stroke="url(#tm-brass)" strokeWidth="2.5" />

      {/* Ingeperste initialen + auto */}
      <g textAnchor="middle" fill="#E2C99F">
        <text x="70" y="115" fontSize="36" fontWeight="300" fill="#000" fillOpacity=".45" dy="1">
          {initials(review.name)}
        </text>
        <text x="70" y="115" fontSize="36" fontWeight="300">
          {initials(review.name)}
        </text>
        <g className="max-sm:hidden" fontSize="9.5" fontWeight="600" letterSpacing="1.2">
          {review.tag.map((line, i) => (
            <text key={line} x="70" y={144 + i * 14}>
              {line}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}

export default function ReviewsSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, "0px");
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [tookOver, setTookOver] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Respecteer prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* --- Slinger ---------------------------------------------------------- */
  const swingEls = useRef<(HTMLSpanElement | null)[]>([]);
  const swing = useRef(REVIEWS.map(() => ({ angle: 0, velocity: 0 })));
  const raf = useRef(0);

  const kick = useCallback((i: number, velocity: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    swing.current[i].velocity += velocity;
    if (raf.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      let moving = false;
      swing.current.forEach((s, k) => {
        s.velocity += (-STIFFNESS * s.angle - DAMPING * s.velocity) * dt;
        s.angle += s.velocity * dt;
        if (Math.abs(s.angle) < 0.02 && Math.abs(s.velocity) < 0.05) {
          s.angle = 0;
          s.velocity = 0;
        } else {
          moving = true;
        }
        const el = swingEls.current[k];
        if (el) el.style.transform = `rotate(${s.angle}deg)`;
      });
      raf.current = moving ? requestAnimationFrame(tick) : 0;
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Eén keer door de rij aanstoten zodra de sectie in beeld komt.
  const greeted = useRef(false);
  useEffect(() => {
    if (!inView || greeted.current) return;
    greeted.current = true;
    const timers = REVIEWS.map((_, i) => setTimeout(() => kick(i, -55), 250 + i * 110));
    return () => timers.forEach(clearTimeout);
  }, [inView, kick]);

  const select = useCallback(
    (next: number) => {
      setActive((current) => {
        if (current === next) return current;
        // De rail krijgt een tik: hoe verder van de gepakte sleutel, hoe minder.
        const dir = next > current ? -1 : 1;
        REVIEWS.forEach((_, i) => kick(i, (dir * 70) / (1 + Math.abs(i - next))));
        return next;
      });
    },
    [kick],
  );

  const take = (i: number) => {
    setTookOver(true);
    select(i);
  };

  // Vanzelf doorwisselen tot de bezoeker zelf een sleutel pakt.
  useEffect(() => {
    if (tookOver || hovering || reduced || !inView) return;
    const id = setTimeout(() => select((active + 1) % REVIEWS.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [active, tookOver, hovering, reduced, inView, select]);

  /* --- Met de muis langs de sleutels strijken ---------------------------- */
  const pointer = useRef({ x: 0, t: 0, speed: 0 });
  const onBoardMove = (e: PointerEvent) => {
    const p = pointer.current;
    const dt = e.timeStamp - p.t;
    if (dt > 0 && p.t) p.speed = (e.clientX - p.x) / dt;
    p.x = e.clientX;
    p.t = e.timeStamp;
  };
  const brush = (e: PointerEvent, i: number) => {
    if (e.pointerType !== "mouse") return;
    const { speed } = pointer.current;
    const strength = Math.min(Math.max(Math.abs(speed) * 70, 24), 80);
    kick(i, speed >= 0 ? -strength : strength);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + REVIEWS.length) % REVIEWS.length;
    take(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-charcoal py-24 sm:py-28"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <KeyDefs />

      {/* De muur: de parkeergarage, ver terug in het donker */}
      <Image
        src="/images/home/parallax-werkplaats.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />

      <div className="mx-auto grid max-w-container gap-12 px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,38rem)] xl:gap-20">
        {/* Kop + citaat */}
        <div className="flex flex-col xl:order-1">
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

          {/* Alle citaten in dezelfde gridcel: de hoogste bepaalt de hoogte, dus niets springt. */}
          <div className="mt-10 hidden xl:mt-auto xl:grid xl:pt-16">
            <Quotes active={active} baseId={baseId} />
          </div>
        </div>

        {/* Sleutelbord */}
        <div className="animate-on-scroll xl:order-2" data-delay="0.2s">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-bronze xl:text-right">
            Pak een sleutel
          </p>

          <div className="relative max-w-[38rem]" onPointerMove={onBoardMove}>
            {/* Licht dat met de gepakte sleutel meeloopt */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[12.5%] -top-36 h-[28rem] w-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                // Twee kolommen breed en op de rand al op nul, zodat er geen rechthoek zichtbaar is.
                transform: `translateX(${active * 50}%)`,
                background:
                  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(226,201,159,.26) 0%, rgba(226,201,159,.13) 40%, rgba(226,201,159,.04) 72%, transparent 100%)",
              }}
            />

            {/* Rail */}
            <div
              aria-hidden
              className="relative z-10 h-2.5 rounded-full bg-gradient-to-b from-[#E2C99F] to-bronze-dark shadow-[0_6px_10px_rgba(0,0,0,0.55)]"
            />

            <div
              role="tablist"
              aria-label="Kies een klantreview"
              onKeyDown={onKeyDown}
              className="relative flex aspect-[38/29]"
            >
              {REVIEWS.map((r, i) => {
                const isActive = i === active;
                const length = r.cord + (isActive ? DROP : 0);
                return (
                  <button
                    key={r.name}
                    id={`${baseId}-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel-${i}`}
                    aria-label={`Review van ${r.name}, ${r.role}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => take(i)}
                    onPointerEnter={(e) => brush(e, i)}
                    className="group relative min-w-0 flex-1 touch-manipulation rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#E2C99F]"
                  >
                    {/* Haakje op de rail */}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14181E] ring-2 ring-[#E2C99F]"
                    />
                    {/* Slinger: draait om het haakje */}
                    <span
                      ref={(el) => {
                        swingEls.current[i] = el;
                      }}
                      className={`absolute inset-x-0 top-0 block origin-top transition-opacity duration-500 [will-change:transform] motion-reduce:transition-none ${
                        isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-0 block h-[100px] w-[1.5px] origin-top bg-[#C6A87A] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                        style={{ transform: `scaleY(${length / 100})` }}
                      />
                      <span
                        className="absolute inset-x-1 top-0 block drop-shadow-[0_18px_14px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inset-x-2"
                        style={{ transform: `translateY(${length}px)` }}
                      >
                        <KeyFob review={r} active={isActive} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobiel: citaat onder het bord */}
          <div className="mt-8 grid xl:hidden">
            <Quotes active={active} baseId={`${baseId}-m`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Quotes({ active, baseId }: { active: number; baseId: string }) {
  return (
    <>
      {REVIEWS.map((r, i) => {
        const isActive = i === active;
        return (
          <figure
            key={r.name}
            id={`${baseId}-panel-${i}`}
            role="tabpanel"
            aria-hidden={!isActive}
            className={`[grid-area:1/1] transition-[opacity,transform,filter,visibility] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              isActive ? "visible translate-y-0 opacity-100 blur-0" : "invisible translate-y-3 opacity-0 blur-sm"
            }`}
          >
            <Stars />
            <blockquote className="mt-6 max-w-[34ch] text-2xl/[1.45] font-light text-white sm:text-[1.75rem]/[1.45] xl:text-[2.1rem]/[1.45]">
              {r.quote}
            </blockquote>
            <figcaption className="mt-7 text-white">
              <span className="block font-semibold xl:text-lg">{r.name}</span>
              <span className="block text-sm text-white/70">{r.role}</span>
            </figcaption>
          </figure>
        );
      })}
    </>
  );
}
