import type { Metadata } from 'next'
import Link from 'next/link'
import StickyNav from './components/StickyNav'
import { DEFAULT_NAV } from './components/nav'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-footer px-6 text-center text-white">
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bronze">404</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">Pagina niet gevonden</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          Deze pagina bestaat niet of is verplaatst.
        </p>
        <Link
          href="/"
          className="btn-gold btn-label mt-8 inline-flex items-center rounded-full px-8 py-4 text-base font-semibold"
        >
          Naar de homepage
        </Link>
      </div>
    </main>
  )
}
