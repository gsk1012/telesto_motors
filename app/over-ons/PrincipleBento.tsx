'use client'

/*
 * Principles as an asymmetric bento with a cursor-tracking bronze spotlight.
 * Reuses the brand's existing hover language (.benefit-card / .benefit-card__spot
 * from globals.css). One dark feature tile carries the core differentiator; the
 * spotlight follows the pointer via CSS vars (no React state, no re-render churn)
 * and collapses to static under prefers-reduced-motion (handled in CSS).
 */

export interface PrincipleTile {
  title: string
  body: string
  /** Tailwind grid-placement classes for the lg bento. */
  area: string
  dark?: boolean
}

export default function PrincipleBento({ tiles }: { tiles: PrincipleTile[] }) {
  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:grid-rows-2">
      {tiles.map((t, i) => (
        <article
          key={t.title}
          onMouseMove={handleMove}
          data-delay={`${i * 0.08}s`}
          className={`benefit-card group animate-on-scroll relative flex min-h-[180px] flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 sm:p-9 ${
            t.dark
              ? 'bg-ink text-white shadow-lg'
              : 'border border-ink/10 bg-white shadow-sm hover:shadow-lg'
          } ${t.area}`}
        >
          <span className="benefit-card__spot" aria-hidden="true" />
          <div className="relative flex h-full flex-col">
            <h3
              className={`font-serif font-semibold leading-snug ${
                t.dark ? 'text-3xl text-white sm:text-4xl' : 'text-2xl text-ink'
              }`}
            >
              {t.title}
            </h3>
            <span className="mt-4 block h-0.5 w-10 origin-left bg-bronze transition-all duration-300 group-hover:w-16" />
            <p
              className={`mt-5 max-w-md leading-relaxed ${
                t.dark ? 'text-base text-white/75 sm:text-lg' : 'text-ink/65'
              }`}
            >
              {t.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
