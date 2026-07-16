"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const IG_URL = "https://www.instagram.com/telesto.motors";

/*
 * Curated Instagram tiles. To show real posts, drop square images into
 * public/images/instagram/ and point each `src` below at the new file —
 * one line per tile, nothing else changes.
 */
const POSTS = [
  { src: "/images/instagram/post-1.jpg", alt: "Telesto Motors selectie" },
  { src: "/images/instagram/post-2.jpg", alt: "Audi" },
  { src: "/images/instagram/post-3.jpg", alt: "Porsche" },
  { src: "/images/instagram/post-4.jpg", alt: "Telesto Motors" },
  { src: "/images/instagram/post-5.jpg", alt: "Droomauto" },
];

// Drie sets achter elkaar zodat de slider naadloos kan doorlopen (oneindig).
const LOOP = [...POSTS, ...POSTS, ...POSTS];
const BASE = POSTS.length;

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.43.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.43.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.71 3.71 0 0 1-1.38-.89 3.71 3.71 0 0 1-.89-1.38c-.17-.43-.37-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.43-.17 1.06-.37 2.23-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.89 5.89 0 0 0 2.12-1.38 5.89 5.89 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.89 5.89 0 0 0-1.38-2.12A5.89 5.89 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  );
}

export default function SocialInstagram() {
  // ----- Oneindige slider -----
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(BASE); // start in de middelste set
  const [slideW, setSlideW] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Breedte van één slide meten (incl. tussenruimte) — robuust bij elke breakpoint.
  useEffect(() => {
    const measure = () => {
      const first = trackRef.current?.children[0] as HTMLElement | undefined;
      if (first) setSlideW(first.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  // Naadloze wrap: na de overgang terugspringen naar de gelijkwaardige echte set.
  const onTransitionEnd = () => {
    if (index >= BASE * 2 || index < BASE) {
      setAnimate(false);
      setIndex(BASE + (((index - BASE) % BASE) + BASE) % BASE);
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

  // Autoplay — geeft de "oneindige" beweging; pauzeert bij hover/verborgen tab.
  useEffect(() => {
    if (paused || reduced || slideW === 0) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [paused, reduced, slideW, next]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Swipe op touch.
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
    <section className="relative overflow-hidden bg-[#14181E] py-8 sm:py-10 lg:py-12">
      {/* Titel boven de beelden */}
      <div className="mb-5 px-6 text-center sm:mb-6">
        <p
          className="animate-on-scroll text-sm font-semibold uppercase tracking-widest text-bronze"
          data-delay="0s"
        >
          Instagram
        </p>
        <h2
          className="animate-on-scroll mt-2 font-serif text-3xl font-light uppercase leading-tight text-white sm:text-4xl lg:text-5xl"
          data-delay="0.08s"
        >
          Bekijk onze socials
        </h2>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-on-scroll mt-2 inline-block text-base font-medium text-bronze transition-colors hover:text-white sm:text-lg"
          data-delay="0.18s"
        >
          @telesto.motors
        </a>
      </div>

      {/* Full-bleed rij grote vierkanten die oneindig door-scrolt */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            className="flex py-4 sm:py-6"
            style={{
              transform: `translate3d(-${index * slideW}px, 0, 0)`,
              transition: animate
                ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
          >
            {LOOP.map((post, i) => {
              const clone = i < BASE || i >= BASE * 2;
              return (
                <div
                  key={i}
                  className="w-[68%] shrink-0 px-1 sm:w-1/3 sm:px-1.5 lg:w-1/5"
                  aria-hidden={clone}
                >
                  <a
                    href={IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Bekijk onze Instagram"
                    tabIndex={clone ? -1 : 0}
                    className="relative block aspect-square overflow-hidden border border-white/10 shadow-lg"
                    draggable={false}
                  >
                    <Image
                      src={post.src}
                      alt={post.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 68vw"
                      draggable={false}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Knop onder de beelden */}
      <div className="mt-5 px-6 text-center sm:mt-6">
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-label animate-on-scroll inline-flex items-center gap-2.5 rounded-full bg-bronze px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-bronze-dark sm:text-base"
          data-delay="0.25s"
        >
          <InstagramGlyph className="h-5 w-5" />
          Ga naar onze Instagram
        </a>
      </div>
    </section>
  );
}
