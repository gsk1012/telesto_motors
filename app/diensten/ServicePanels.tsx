'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Service } from './services'

/*
 * Expanding image panels (accordion gallery). On desktop the panels sit in a row
 * and the hovered/focused one grows wide to reveal its detail; the rest stay slim
 * with a vertical label. On mobile they stack and the active one expands on tap.
 * Only one panel is ever large, so it reads as one interactive element, not a wall.
 */
export default function ServicePanels({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
      {services.map((s, i) => {
        const isActive = i === active
        return (
          <div
            key={s.slug}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-all duration-500 ease-out motion-reduce:transition-none lg:h-full ${
              isActive ? 'h-72 lg:flex-[3.5]' : 'h-20 lg:flex-[1]'
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            {/* Collapsed label */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-300 ${
                isActive ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {/* mobile: horizontal at the bottom */}
              <span className="absolute bottom-5 left-5 right-5 font-serif text-lg font-semibold text-white lg:hidden">
                {s.title}
              </span>
              {/* desktop: vertical, centered */}
              <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rotate-180 whitespace-nowrap font-serif text-xl font-semibold text-white [writing-mode:vertical-rl] lg:block">
                {s.title}
              </span>
            </div>

            {/* Expanded content */}
            <div
              className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 sm:p-7 ${
                isActive ? 'opacity-100 delay-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <h3 className="font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {s.title}
              </h3>
              <span className="mt-3 block h-0.5 w-12 bg-bronze" />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{s.shortBody}</p>
              <Link
                href={`/diensten/${s.slug}`}
                onFocus={() => setActive(i)}
                className="btn-label mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white focus:outline-none focus-visible:underline"
              >
                Lees meer
                <svg
                  className="h-4 w-4 text-bronze transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
