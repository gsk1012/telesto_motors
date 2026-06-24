import type { Metadata } from 'next'
import Image from 'next/image'
import StickyNav from '../components/StickyNav'
import ScrollAnimator from '../components/ScrollAnimator'

export const metadata: Metadata = {
  title: 'Pakketen — Telesto Motors',
  description:
    'Ontdek onze drie diensten: Telesto Elite, Deluxe en Excellent. Van een gerichte start tot volledig ontzorgd van A tot Z.',
}

const PLANS_NAV = [
  { label: 'Home', href: '/#home' },
  { label: 'Over ons', href: '/#over' },
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Pakketen', href: '/plans' },
  { label: 'Contact', href: '/#contact' },
]

const PLANS = [
  {
    tier: 'Elite',
    name: 'Telesto Elite',
    description:
      'Een gerichte start in je auto-zoektocht. Wij geven je een helder beeld van de beste opties die aansluiten bij jouw wensen en budget.',
    featured: false,
    features: [
      { label: 'Onafhankelijk auto-advies', included: true },
      { label: 'Autosearch', included: true },
      { label: 'Selectie op wensen', included: true },
      { label: 'Screening & onderhandeling', included: false },
      { label: 'Technische keuring', included: false },
      { label: 'Inruiladvies', included: false },
    ],
  },
  {
    tier: 'Deluxe',
    name: 'Telesto Deluxe',
    description:
      'Wij staan voor je klaar om de beste deal te maken. Betaal nooit te veel voor jouw droomauto.',
    featured: true,
    features: [
      { label: 'Onafhankelijk auto-advies', included: true },
      { label: 'Autosearch', included: true },
      { label: 'Selectie op wensen', included: true },
      { label: 'Screening & onderhandeling', included: true },
      { label: 'Technische keuring', included: false },
      { label: 'Inruiladvies', included: false },
    ],
  },
  {
    tier: 'Excellent',
    name: 'Telesto Excellent',
    description:
      'Volledig ontzorgd van A tot Z. Vertel ons jouw wensen en wij regelen alles rondom jouw auto-aankoop.',
    featured: false,
    features: [
      { label: 'Onafhankelijk auto-advies', included: true },
      { label: 'Autosearch', included: true },
      { label: 'Selectie op wensen', included: true },
      { label: 'Screening & onderhandeling', included: true },
      { label: 'Technische keuring', included: true },
      { label: 'Inruiladvies', included: true },
    ],
  },
]

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-bronze/15 text-bronze">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

function CrossIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink/6 text-ink/25">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  )
}

export default function PlansPage() {
  return (
    <main className="bg-cream text-ink">
      <StickyNav links={PLANS_NAV} logoHref="/" ctaHref="/#contact" />

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[78svh] w-full items-end overflow-hidden md:items-center">
        <Image
          src="/images/tesla-hero.webp"
          alt="Telesto Motors — jouw droomauto"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* scrims — identical to homepage */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <h1
              className="animate-fade-up font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '0.05s' }}
            >
              Laten wij u op weg helpen
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-base text-white/80 sm:text-lg"
              style={{ animationDelay: '0.3s' }}
            >
              Kies het plan dat het beste aansluit bij jouw wensen. Van een gerichte start tot een volledig ontzorgde auto-aankoop.
            </p>
            <a
              href="/#contact"
              className="animate-fade-up mt-8 inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-bronze-dark"
              style={{ animationDelay: '0.5s' }}
            >
              Plan een consult in
            </a>
          </div>
        </div>
      </section>

      {/* ===== Plans ===== */}
      <section className="py-24 plans-section-bg">
        <div className="mx-auto max-w-container px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {PLANS.map((plan, i) => (
              <article
                key={plan.tier}
                className={`animate-on-scroll relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? 'border-2 border-bronze bg-white shadow-xl hover:shadow-2xl'
                    : 'border border-ink/10 bg-white shadow-sm hover:shadow-md'
                }`}
                data-delay={`${0.08 + i * 0.12}s`}
              >
                {/* Bronze top accent for featured */}
                {plan.featured && (
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-bronze" />
                )}

                <div className="flex flex-1 flex-col p-8">
                  {plan.featured && (
                    <span className="mb-5 self-start rounded-full bg-bronze/10 px-3 py-1 text-xs font-semibold tracking-wide text-bronze">
                      Meest gekozen
                    </span>
                  )}

                  <h2 className="font-serif text-2xl font-semibold leading-snug">
                    {plan.name}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {plan.description}
                  </p>

                  <ul className="mt-8 flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-center gap-3">
                        {feature.included ? <CheckIcon /> : <CrossIcon />}
                        <span
                          className={`text-sm ${
                            feature.included ? 'text-ink/85' : 'text-ink/30'
                          }`}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <a
                      href="/#contact"
                      className={`flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold transition-colors ${
                        plan.featured
                          ? 'bg-bronze text-white hover:bg-bronze-dark'
                          : 'border border-ink/15 text-ink/70 hover:border-bronze hover:text-bronze'
                      }`}
                    >
                      Plan een consult in
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-container px-6 text-center">
          <h2
            className="animate-on-scroll font-serif text-4xl font-semibold text-white sm:text-5xl"
            data-delay="0s"
          >
            Klaar om te starten?
          </h2>
          <p
            className="animate-on-scroll mx-auto mt-5 max-w-md text-lg text-white/55"
            data-delay="0.15s"
          >
            Plan nu je persoonlijk consult in. Wij nemen contact op en helpen je verder.
          </p>
          <a
            href="/#contact"
            className="animate-on-scroll mt-8 inline-flex items-center justify-center rounded-full bg-bronze px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-bronze-dark"
            data-delay="0.28s"
          >
            Persoonlijk consult inplannen
          </a>
        </div>
      </section>

      <ScrollAnimator />

      {/* ===== Footer ===== */}
      <footer className="bg-ink py-16 text-white/80">
        <div className="mx-auto grid max-w-container gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/telesto-logo-color.svg"
              alt="Telesto Motors"
              className="h-20 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-white/60">
              De onafhankelijke auto-adviseur die luistert naar jouw wensen.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Menu
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {PLANS_NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>info@telestomotors.nl</li>
              <li>+31 (0)6 12 34 56 78</li>
              <li>Nederland</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Openingstijden
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>Ma t/m vr: 09:00 - 18:00</li>
              <li>Za: op afspraak</li>
              <li>Zo: gesloten</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-container flex flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Telesto Motors</span>
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
      </footer>
    </main>
  )
}
