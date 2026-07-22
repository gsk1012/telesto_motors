"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/hero/hero-1.avif", alt: "Premium auto geselecteerd door Telesto" },
  { src: "/images/hero/hero-2.webp", alt: "Onafhankelijke autokeuring door Telesto" },
  { src: "/images/hero/hero-3.jpg", alt: "Droomauto klaar voor overhandiging" },
];

const INTERVAL = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-transform"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i === active ? undefined : true}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            unoptimized
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
