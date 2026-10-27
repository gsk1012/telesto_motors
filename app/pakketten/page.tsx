import type { Metadata } from 'next'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import ParallaxImage from '../components/ParallaxImage'
import SplitHeading from '../components/SplitHeading'
import BrandsMarquee from '../components/BrandsMarquee'
import FaqSection from '../components/FaqSection'
import SocialInstagram from '../components/SocialInstagram'
import { FAQS } from '../lib/faqs'

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
    url: 'https://telestomotors.nl/pakketten',
    siteName: 'Telesto Motors',
    title: 'Pakketten & Prijzen | Telesto Motors',
    description:
      'Kies het pakket dat past bij jouw wensen: Telesto Elite, Deluxe of Excellent. Van onafhankelijk auto-advies tot volledig ontzorgd van A tot Z.',
    images: [
      {
        url: '/images/plans/hero.jpg',
        width: 2560,
        height: 1429,
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
    canonical: 'https://telestomotors.nl/pakketten',
  },
}

const PLANS = [
  {
    tier: 'Elite',
    name: 'Telesto Elite',
    scope: 'Gericht advies',
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
    scope: 'Advies & onderhandeling',
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
    scope: 'Volledig ontzorgd',
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
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-bronze/20 text-bronze">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

function CrossIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/[0.06] text-white/30">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
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
      { '@type': 'ListItem', position: 2, name: 'Pakketten', item: 'https://telestomotors.nl/pakketten' },
    ],
  }

  return (
    <main className="bg-cream text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero (full-height parallax photo, copy weighted to the left) ===== */}
      <section className="relative flex min-h-[62svh] w-full items-end overflow-hidden md:min-h-[88svh] md:items-center">
        <ParallaxImage
          src="/images/plans/hero.jpg"
          alt="Auto-adviseur in gesprek met een klant tussen premium auto's in het gouden avondlicht"
          priority
          className="object-cover object-[62%_center] md:object-center"
        />
        {/* scrims — identical to homepage */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <SplitHeading
              as="h1"
              lines={['Kies hoeveel we je', 'uit handen nemen']}
              className="font-sans text-4xl/[1.3] font-light uppercase tracking-[0.04em] text-white sm:text-5xl/[1.3] lg:text-6xl/[1.3]"
            />
            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              Drie pakketten: van gericht advies tot een aankoop die we volledig voor je regelen.
              Altijd onafhankelijk, altijd één vast aanspreekpunt.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.32s' }}
            >
              <a
                href="/contact#formulier"
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Plan een consult in
              </a>
              <a
                href="#pakketten"
                className="btn-label group hidden items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/35 transition-all duration-200 hover:bg-white/10 hover:ring-white/70 active:scale-[0.98] sm:inline-flex"
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

      {/* ===== Merken-marquee (dark strip, flows straight into the packages stage) ===== */}
      <BrandsMarquee />

      {/* ===== Packages ("dark showroom": tiers on charcoal, spotlight on the featured plan) ===== */}
      <section
        id="pakketten"
        className="relative -mt-px scroll-mt-24 overflow-hidden bg-[#191D23] pt-16 pb-24 sm:pb-28"
      >
        {/* Deepen the stage toward the bottom so it settles into the light section that follows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#191D23] via-[#191D23] to-[#14181E]"
        />
        {/* Warm bronze spotlight behind the recommended plan */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[42%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(166,132,99,0.20), transparent 68%)' }}
        />

        <div className="relative z-10 mx-auto max-w-container px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {PLANS.map((plan, i) => (
              <article
                key={plan.tier}
                className={`animate-on-scroll relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 ${
                  plan.featured
                    ? 'bg-[#22262E] ring-1 ring-bronze/60 lg:-my-4 z-10'
                    : 'bg-[#20242B] ring-1 ring-white/10'
                }`}
                data-delay={`${0.08 + i * 0.12}s`}
                style={
                  plan.featured
                    ? { boxShadow: 'inset 0 0 26px 0 rgba(166,132,99,0.30), 0 24px 60px -12px rgba(0,0,0,0.55)' }
                    : undefined
                }
              >
                <div className="flex flex-1 flex-col p-8">
                  {plan.featured ? (
                    <span className="mb-5 self-start rounded-full bg-bronze/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-bronze">
                      Meest gekozen
                    </span>
                  ) : (
                    <span className="mb-5 self-start text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                      {plan.scope}
                    </span>
                  )}

                  <h3 className="font-serif text-2xl font-light leading-snug text-white">{plan.name}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">{plan.description}</p>

                  <ul className="mt-8 flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-center gap-3">
                        {feature.included ? <CheckIcon /> : <CrossIcon />}
                        <span className={`text-sm ${feature.included ? 'text-white/85' : 'text-white/40'}`}>
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
                          ? 'btn-gold'
                          : 'text-white/80 ring-1 ring-white/25 hover:text-white hover:ring-bronze/70'
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

      {/* ===== FAQ ===== */}
      <FaqSection blurb="het pakket dat past." light />

      {/* ===== Social / Instagram ===== */}
      <SocialInstagram />

      {/* ===== Closing CTA (premium dark panel, same showroom language as the featured plan) ===== */}
      <section className="relative -mt-px overflow-hidden bg-footer px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div
            className="animate-on-scroll relative overflow-hidden rounded-3xl bg-[#22262E] px-8 py-12 text-white ring-1 ring-bronze/50 sm:px-14 sm:py-16"
            data-delay="0s"
            style={{ boxShadow: 'inset 0 0 44px 0 rgba(166,132,99,0.22), 0 30px 70px -24px rgba(0,0,0,0.6)' }}
          >
            {/* Warm bronze spotlight, echoing the packages stage */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(166,132,99,0.32), transparent 70%)' }}
            />
            <div className="relative flex flex-col gap-9 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
              <div className="max-w-md">
                <SplitHeading
                  lines={['Nog niet zeker', 'welk pakket past?']}
                  className="font-serif text-3xl/[1.3] font-light text-white sm:text-4xl/[1.3]"
                />
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  Plan een vrijblijvend consult. We bespreken je wensen en kiezen samen het pakket
                  dat bij jou past.
                </p>
              </div>
              <div className="flex w-full flex-none flex-col items-stretch gap-4 sm:w-auto sm:items-center">
                <a
                  href="/contact#formulier"
                  className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
                >
                  Plan een consult in
                </a>
                <a
                  href="tel:+31620779977"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4" />
                  +31 (0)6 20 77 99 77
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollAnimator />
    </main>
  )
}
