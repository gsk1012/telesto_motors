import type { Metadata } from 'next'
import Link from 'next/link'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import ParallaxImage from '../components/ParallaxImage'
import FaqAccordion, { type FaqItem } from '../components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Pakketten & Prijzen',
  description:
    'Kies het pakket dat past bij jouw wensen: Telesto Elite, Deluxe of Excellent. Van onafhankelijk auto-advies tot volledig ontzorgd van A tot Z.',
  keywords: [
    'auto-advies pakket',
    'autobegeleiding kosten',
    'Telesto Elite',
    'Telesto Deluxe',
    'Telesto Excellent',
    'auto kopen service',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://telestomotors.nl/plans',
    siteName: 'Telesto Motors',
    title: 'Pakketten & Prijzen | Telesto Motors',
    description:
      'Kies het pakket dat past bij jouw wensen: Telesto Elite, Deluxe of Excellent. Van onafhankelijk auto-advies tot volledig ontzorgd van A tot Z.',
    images: [
      {
        url: '/images/plans/hero.jpg',
        width: 2048,
        height: 1152,
        alt: 'Telesto Motors, pakketten en prijzen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pakketten & Prijzen | Telesto Motors',
    description:
      'Kies het pakket dat past bij jouw wensen: Telesto Elite, Deluxe of Excellent.',
    images: ['/images/plans/hero.jpg'],
  },
  alternates: {
    canonical: 'https://telestomotors.nl/plans',
  },
}

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

const STANDARDS = [
  { accent: 'Onafhankelijk', text: 'sinds 2008' },
  { accent: 'Geen', text: 'merkbinding of voorraad' },
  { accent: 'Eén', text: 'vast aanspreekpunt' },
]

const FAQS: FaqItem[] = [
  {
    question: 'Wat kost een pakket?',
    answer:
      'Dat hangt af van het pakket en van jouw zoekvraag: een courante gezinsauto vraagt minder uren dan een zeldzame uitvoering. In het eerste consult hoor je precies wat het traject in jouw situatie kost, vrijblijvend en vooraf helder.',
  },
  {
    question: 'Kan ik later opschalen naar een uitgebreider pakket?',
    answer:
      'Ja. De pakketten bouwen op elkaar voort, dus opschalen kan ook halverwege je traject. Begin gerust met Elite en breid uit zodra je merkt dat je meer uit handen wilt geven.',
  },
  {
    question: 'Ik heb al een auto op het oog. Heeft een pakket dan nog zin?',
    answer:
      'Vaak is een losse dienst dan logischer, bijvoorbeeld alleen de technische keuring of de prijsonderhandeling. Leg je situatie voor in een consult, dan hoor je direct wat het beste past.',
    link: { href: '/diensten', label: 'Bekijk de losse diensten' },
  },
  {
    question: 'Hoe lang duurt een traject?',
    answer:
      'Dat verschilt per zoekvraag. Een ruim aanbod betekent snel schakelen; een specifieke kleur of uitvoering vraagt meer geduld. Na de kennismaking krijg je een realistische inschatting voor jouw situatie.',
  },
  {
    question: 'Zijn jullie echt onafhankelijk?',
    answer:
      'Ja. We hebben geen voorraad, geen merkbinding en geen belang bij een specifieke dealer. Jij bent onze enige opdrachtgever, dus ons advies dient maar één doel: de juiste auto voor jou.',
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

function ArrowRightIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
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

export default function PlansPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://telestomotors.nl' },
      { '@type': 'ListItem', position: 2, name: 'Pakketten', item: 'https://telestomotors.nl/plans' },
    ],
  }

  return (
    <main className="bg-cream text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero (full-height parallax photo, copy weighted to the left) ===== */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden md:items-center">
        <ParallaxImage
          src="/images/plans/hero.jpg"
          alt="Adviseur loopt met twee klanten langs een rij premium auto's in de avondzon"
          priority
          className="object-cover object-center"
        />
        {/* scrims — identical to homepage */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <h1
              className="animate-fade-up font-serif text-[2.6rem] font-semibold leading-[1.06] text-white [text-wrap:balance] sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '0.05s' }}
            >
              Kies hoeveel we je uit handen nemen
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: '0.18s' }}
            >
              Drie pakketten: van gericht advies tot een aankoop die we volledig voor je regelen.
              Altijd onafhankelijk, altijd één vast aanspreekpunt.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.3s' }}
            >
              <a
                href="/contact#formulier"
                className="btn-label inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-bronze-dark active:scale-[0.98]"
              >
                Plan een consult in
              </a>
              <a
                href="#pakketten"
                className="btn-label group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/35 transition-all duration-200 hover:bg-white/10 hover:ring-white/70 active:scale-[0.98]"
              >
                Bekijk de pakketten
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

      {/* ===== Plans (header + three cumulative tiers) ===== */}
      <section id="pakketten" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-2xl">
            <h2
              className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl"
              data-delay="0s"
            >
              Drie pakketten, één aanpak
            </h2>
            <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65" data-delay="0.1s">
              Elk pakket bouwt voort op het vorige. Start met gericht advies, of laat het complete
              traject aan ons over: zoeken, keuren en onderhandelen tot de sleutels in je hand liggen.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {PLANS.map((plan, i) => (
              <article
                key={plan.tier}
                className={`animate-on-scroll relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? 'border-2 border-bronze bg-white shadow-xl hover:shadow-2xl lg:-my-4'
                    : 'border border-ink/10 bg-white shadow-sm hover:shadow-md'
                }`}
                data-delay={`${0.08 + i * 0.12}s`}
              >
                <div className="flex flex-1 flex-col p-8">
                  {plan.featured && (
                    <span className="mb-5 self-start rounded-full bg-bronze/10 px-3 py-1 text-xs font-semibold tracking-wide text-bronze-dark">
                      Meest gekozen
                    </span>
                  )}

                  <h3 className="font-serif text-2xl font-semibold leading-snug">{plan.name}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{plan.description}</p>

                  <ul className="mt-8 flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-center gap-3">
                        {feature.included ? <CheckIcon /> : <CrossIcon />}
                        <span className={`text-sm ${feature.included ? 'text-ink/85' : 'text-ink/50'}`}>
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <a
                      href="/contact#formulier"
                      className={`btn-label flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                        plan.featured
                          ? 'bg-bronze text-white hover:bg-bronze-dark'
                          : 'border border-ink/15 text-ink/75 hover:border-bronze hover:text-bronze-dark'
                      }`}
                    >
                      Plan een consult in
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="animate-on-scroll mt-12 text-center text-base text-ink/60" data-delay="0.1s">
            Liever één losse dienst, zoals alleen een keuring?{' '}
            <Link
              href="/diensten"
              className="inline-flex items-center gap-1 font-semibold text-bronze-dark transition-colors hover:text-ink"
            >
              Bekijk de losse diensten
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-3xl">
            <h2
              className="animate-on-scroll font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
              data-delay="0s"
            >
              Veelgestelde vragen
            </h2>
            <div className="mt-10">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Standard band (full-bleed parallax photo, dark finale starts here) ===== */}
      <section className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-ink py-16 sm:min-h-[620px] sm:py-20">
        <ParallaxImage
          src="/images/plans/band.jpg"
          alt="Adviseur overhandigt de autosleutels aan een tevreden klant bij haar auto"
          className="object-cover object-center"
        />
        {/* Scrims: even darken for centered copy, stronger bottom to blend into the CTA below */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="animate-on-scroll font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white [text-wrap:balance] sm:text-5xl"
              data-delay="0s"
            >
              Elk pakket, dezelfde standaard
            </h2>
            <p
              className="animate-on-scroll mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
              data-delay="0.12s"
            >
              De pakketten verschillen in hoeveel wij uit handen nemen, nooit in aandacht. Je krijgt
              altijd onafhankelijk advies en een adviseur die pas tevreden is als jij het bent.
            </p>
          </div>

          <ul
            className="animate-on-scroll mx-auto mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-7 sm:mt-12 lg:flex-row lg:justify-center lg:gap-0"
            data-delay="0.24s"
          >
            {STANDARDS.map((s) => (
              <li
                key={s.text}
                className="whitespace-nowrap text-lg leading-none text-white/85 lg:ml-8 lg:border-l lg:border-white/20 lg:pl-8 lg:first:ml-0 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="font-serif font-semibold text-bronze">{s.accent}</span> {s.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Closing CTA (bronze panel on the dark finale into the footer) ===== */}
      <section className="relative -mt-px bg-ink px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div
            className="animate-on-scroll relative overflow-hidden rounded-3xl bg-bronze-dark px-8 py-12 text-white shadow-2xl shadow-black/30 sm:px-12 sm:py-14"
            data-delay="0s"
          >
            <div className="flex flex-col gap-9 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
              <div className="max-w-md">
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Nog niet zeker welk pakket past?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                  Plan een vrijblijvend consult. We bespreken je wensen en kiezen samen het pakket
                  dat bij jou past.
                </p>
              </div>
              <div className="flex w-full flex-none flex-col items-stretch gap-4 sm:w-auto sm:items-center">
                <a
                  href="/contact#formulier"
                  className="btn-label inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-all duration-200 hover:bg-cream active:scale-[0.98]"
                >
                  Plan een consult in
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
      <footer className="-mt-px bg-ink py-16 text-white/80">
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
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>info@telestomotors.nl</li>
              <li>+31 (0)6 20 92 92 14</li>
              <li>Nederland</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Openingstijden
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>Ma t/m vr: 09.00 - 22.00 (op afspraak)</li>
              <li>Za: 09.30 - 16.00</li>
              <li>Zo: op afspraak</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-container flex flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Telesto Motors</span>
          <div className="flex items-center gap-4">
            <a
              href="/privacybeleid"
              className="transition-colors hover:text-white/70"
            >
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
