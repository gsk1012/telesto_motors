import type { Metadata } from 'next'
import Image from 'next/image'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import { SERVICES } from './services'
import ServicePanels from './ServicePanels'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Van persoonlijk advies en technische keuring tot prijsonderhandeling, begeleiding en EV-advies. Bekijk alle diensten van Telesto Motors, jouw onafhankelijke autoadviseur.',
  alternates: { canonical: 'https://telestomotors.nl/diensten' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://telestomotors.nl/diensten',
    siteName: 'Telesto Motors',
    title: 'Diensten | Telesto Motors',
    description:
      'Van persoonlijk advies en technische keuring tot prijsonderhandeling, begeleiding en EV-advies. Onafhankelijk autoadvies dat luistert naar jouw wensen.',
    images: [
      {
        url: '/images/diensten/hero.jpg',
        width: 2048,
        height: 1152,
        alt: 'Telesto Motors — Diensten',
      },
    ],
  },
}

function PhoneIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  )
}

export default function DienstenPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Diensten',
    url: 'https://telestomotors.nl/diensten',
    hasPart: SERVICES.map((s) => ({
      '@type': 'Service',
      name: s.title,
      url: `https://telestomotors.nl/diensten/${s.slug}`,
    })),
  }

  return (
    <main className="bg-cream text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <StickyNav logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero (full-bleed immersive opening, same language as the other pages) ===== */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink sm:items-center">
        <Image
          src="/images/diensten/hero.jpg"
          alt="Autoadviseur van Telesto Motors keurt een premium sedan bij het geopende portier in het warme avondlicht"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Scrims: left for the headline column, top for nav legibility, base for depth */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/15" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/50" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-24 pt-28 sm:pb-16">
          <div className="max-w-2xl">
            <h1
              className="animate-fade-up font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white [text-wrap:balance] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '0.05s' }}
            >
              Onze diensten
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-[48ch] text-lg leading-relaxed text-white/80 sm:text-xl"
              style={{ animationDelay: '0.14s' }}
            >
              Kies één losse dienst, of laat ons het hele traject verzorgen. Onafhankelijk,
              persoonlijk en zonder merkbinding: we kijken alleen naar wat voor jou de beste keuze is.
            </p>
            <ul
              className="animate-fade-up mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
              style={{ animationDelay: '0.22s' }}
            >
              {SERVICES.map((s) => (
                <li key={s.slug} className="flex items-center gap-2.5">
                  <svg
                    className="h-4 w-4 flex-none text-bronze"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-white/85">{s.title}</span>
                </li>
              ))}
            </ul>
            <div
              className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.32s' }}
            >
              <a
                href="/contact#formulier"
                className="btn-label inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-bronze-dark active:scale-[0.98]"
              >
                Plan een kennismaking
              </a>
              <a
                href="#diensten-overzicht"
                className="btn-label group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                Bekijk de diensten
                <svg
                  className="h-4 w-4 text-bronze transition-transform duration-200 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services (expanding image panels — one big at a time, not a photo wall) ===== */}
      <section id="diensten-overzicht" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-2xl">
            <h2
              className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl"
              data-delay="0s"
            >
              Wat we voor je doen
            </h2>
            <p
              className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65"
              data-delay="0.1s"
            >
              Elke dienst kun je los afnemen, precies daar waar jij hulp bij nodig hebt. Of laat het
              complete traject aan ons over, van de eerste zoekopdracht tot de sleutels in je hand.
            </p>
          </div>

          <div className="animate-on-scroll mt-12" data-delay="0.15s">
            <ServicePanels services={SERVICES} />
          </div>
        </div>
      </section>

      {/* ===== Closing contact CTA (bronze panel bridging the white services section into the footer) ===== */}
      <section className="relative bg-white px-6 py-16 sm:py-24">
        {/* Lower half takes the footer colour so the card appears to lift off the seam */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 bg-ink" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="animate-on-scroll relative overflow-hidden rounded-3xl bg-bronze-dark px-8 py-12 text-white shadow-2xl shadow-black/30 sm:px-12 sm:py-14" data-delay="0s">
            <div className="flex flex-col gap-9 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
              <div className="max-w-md">
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Niet zeker welke dienst je nodig hebt?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                  Plan een vrijblijvende kennismaking. We kijken samen wat het beste bij jouw
                  situatie past.
                </p>
              </div>
              <div className="flex w-full flex-none flex-col items-stretch gap-4 sm:w-auto sm:items-center">
                <a
                  href="/contact#formulier"
                  className="btn-label inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-cream"
                >
                  Plan een kennismaking
                </a>
                <a
                  href="tel:+31620929214"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4" />
                  +31 (0)6 20 92 92 14
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollAnimator />

      {/* ===== Footer ===== */}
      <footer className="bg-ink py-16 text-white/80">
        <div className="mx-auto grid max-w-container gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/telesto-logo-color.svg" alt="Telesto Motors" className="h-20 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-white/60">
              De onafhankelijke auto-adviseur die luistert naar jouw wensen.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">Menu</p>
            <ul className="mt-4 space-y-2 text-sm">
              {DEFAULT_NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>info@telestomotors.nl</li>
              <li>+31 (0)6 20 92 92 14</li>
              <li>Nederland</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">Openingstijden</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>Ma t/m vr: 09.00 - 22.00 (op afspraak)</li>
              <li>Za: 09.30 - 16.00</li>
              <li>Zo: op afspraak</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-container flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Telesto Motors</span>
          <div className="flex items-center gap-4">
            <a href="/privacybeleid" className="transition-colors hover:text-white/70">
              Privacybeleid
            </a>
            <span className="text-white/20">·</span>
            <span>
              Gemaakt door{' '}
              <a
                href="https://bluestardevelopment.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors hover:text-white/70"
              >
                BlueStar Development
              </a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
