"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

const SLIDES = [
  { src: "/images/hero/hero-2.webp", alt: "Onafhankelijke autokeuring door Telesto" },
  { src: "/images/hero/hero-3.jpg", alt: "Droomauto klaar voor overhandiging" },
  { src: "/images/hero/hero-1.avif", alt: "Premium auto geselecteerd door Telesto" },
];

const INTERVAL = 5000;

export default function HeroSlider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, '0px');
  const [active, setActive] = useState(0);
  // De tweede en derde slide worden pas in de DOM gezet als de pagina klaar is
  // met laden. Anders vechten ze om bandbreedte met de eerste slide, die de
  // LCP van de homepage is. Ze hebben tot de eerste wissel (5s) de tijd.
  const [preloadRest, setPreloadRest] = useState(false);

  useEffect(() => {
    const arm = () => setPreloadRest(true);
    if (document.readyState === "complete") {
      const t = setTimeout(arm, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", arm, { once: true });
    // Vangnet: mocht `load` uitblijven (hangende third-party request), dan
    // begint de slider alsnog.
    const fallback = setTimeout(arm, 2500);
    return () => {
      window.removeEventListener("load", arm);
      clearTimeout(fallback);
    };
  }, []);

  // Draait alleen zolang de hero echt in beeld is — verderop op de pagina heeft
  // een wisselende hero geen zin en kost hij alleen renders.
  useEffect(() => {
    if (!preloadRest || !inView) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [preloadRest, inView]);

  return (
    <div ref={rootRef} className="absolute inset-0 h-full w-full">
      {SLIDES.map((slide, i) =>
        i > 0 && !preloadRest ? null : (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i === active ? undefined : true}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ),
      )}
    </div>
  );
}
