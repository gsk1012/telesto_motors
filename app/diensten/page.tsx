import type { Metadata } from 'next'
import Image from 'next/image'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ParallaxImage from '../components/ParallaxImage'
import FaqSection from '../components/FaqSection'
import SplitHeading from '../components/SplitHeading'
import BrandsMarquee from '../components/BrandsMarquee'
import SocialInstagram from '../components/SocialInstagram'
import ScrollAnimator from '../components/ScrollAnimator'
import { FAQS } from '../lib/faqs'
import { SERVICES } from './services'
import ServicePanels from './ServicePanels'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Van persoonlijk advies en technische keuring tot prijsonderhandeling, begeleiding en EV-advies. Alle diensten van Telesto Motors, jouw onafhankelijke autoadviseur.',
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
        width: 2000,
        height: 1125,
        alt: 'Telesto Motors — Diensten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diensten | Telesto Motors',
    description:
      'Van persoonlijk advies en technische keuring tot prijsonderhandeling, begeleiding en EV-advies.',
    images: ['/images/diensten/hero.jpg'],
  },
}

const JOURNEY = [
  {
    title: 'Kennismaking',
    body: 'We brengen jouw wensen, budget en rijgedrag in kaart. Zo weten we precies waar we naar zoeken.',
  },
  {
    title: 'Zoeken & selecteren',
    body: 'We doorzoeken de volledige markt en stellen een shortlist op maat samen, met de voor- en nadelen helder naast elkaar.',
  },
  {
    title: 'Keuren & onderhandelen',
    body: 'We keuren de auto technisch en onderhandelen namens jou de scherpste prijs en de beste voorwaarden.',
  },
  {
    title: 'De sleutels',
    body: 'We controleren de papieren en begeleiden je tot de sleutels in jouw hand liggen. Zonder verrassingen achteraf.',
  },
]

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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main className="bg-cream text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero (full-height parallax photo, copy weighted to the left) ===== */}
      <section className="relative flex min-h-[62svh] w-full items-end overflow-hidden md:min-h-[88svh] md:items-center">
        <ParallaxImage
          src="/images/diensten/hero.jpg"
          alt="Autoadviseur van Telesto Motors keurt een premium sedan bij het geopende portier in het warme avondlicht"
          priority
          className="object-cover object-[62%_center] md:object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <SplitHeading
              as="h1"
              lines={['Alles voor jouw', 'auto-aankoop']}
              className="font-sans text-4xl/[1.3] font-light uppercase tracking-[0.04em] text-white sm:text-5xl/[1.3] lg:text-6xl/[1.3]"
            />
            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              Wij verzorgen het hele traject, van advies tot sleutelovergave. Onafhankelijk,
              persoonlijk en zonder merkbinding: we kijken alleen naar wat voor jou de beste keuze is.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.32s' }}
            >
              <a
                href="/contact#formulier"
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Plan een kennismaking
              </a>
              <a
                href="#diensten-overzicht"
                className="btn-label group hidden items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/35 transition-all duration-200 hover:bg-white/10 hover:ring-white/70 active:scale-[0.98] sm:inline-flex"
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

      <BrandsMarquee />

      {/* ===== Services ("dark showroom": expanding image panels on charcoal) ===== */}
      <section
        id="diensten-overzicht"
        className="relative -mt-px scroll-mt-24 overflow-hidden bg-[#191D23] pt-16 pb-24 sm:pb-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#191D23] via-[#191D23] to-[#14181E]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[42%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(166,132,99,0.14), transparent 68%)' }}
        />
        <div className="relative z-10 mx-auto max-w-container px-6">
          <div className="max-w-2xl">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Wat we voor je doen
            </p>
            <SplitHeading
              lines={['Precies de hulp', 'die jij nodig hebt']}
              className="mt-3 font-serif text-4xl/[1.3] font-light text-white sm:text-5xl/[1.3]"
            />
            <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-white/60" data-delay="0.1s">
              Wij nemen het complete traject uit handen, van de eerste zoekopdracht tot de sleutels
              in je hand.
            </p>
          </div>
          <div className="animate-on-scroll mt-12" data-delay="0.15s">
            <ServicePanels services={SERVICES} />
          </div>
        </div>
      </section>

      {/* ===== Journey (full-bleed split: flush image, no radius) ===== */}
      <section className="overflow-hidden bg-cream text-ink">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 px-6 py-16 sm:py-20 lg:order-1 lg:py-24 lg:pl-14 lg:pr-16 xl:pl-20">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Zo werkt het
            </p>
            <SplitHeading
              lines={['Van eerste gesprek', 'tot de sleutels']}
              className="mt-3 font-serif text-4xl/[1.3] font-light text-ink sm:text-5xl/[1.3]"
            />
            <p className="animate-on-scroll mt-5 max-w-md text-lg leading-relaxed text-ink/65" data-delay="0.1s">
              Welke dienst je ook kiest, de aanpak volgt dezelfde vier stappen. Je weet altijd
              waar we staan en wat de volgende stap is.
            </p>

            <ol className="mt-10">
              {JOURNEY.map((step, i) => (
                <li
                  key={step.title}
                  className="animate-on-scroll relative flex gap-5 pb-8 last:pb-0"
                  data-delay={`${0.15 + i * 0.1}s`}
                >
                  {i < JOURNEY.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.375rem] top-11 h-[calc(100%-2.75rem)] w-px bg-bronze/25"
                    />
                  )}
                  <span className="relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#EDE3DC] font-serif text-lg font-semibold text-bronze-dark ring-1 ring-bronze/25">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-xl font-light text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ink/65">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-auto lg:min-h-[600px]">
            <Image
              src="/images/plans/band.jpg"
              alt="Adviseur overhandigt de autosleutels aan een tevreden klant bij haar auto"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FaqSection blurb="de dienst die past." />

      {/* ===== Social / Instagram ===== */}
      <SocialInstagram />

      {/* ===== Closing CTA (premium dark panel) ===== */}
      <section className="relative -mt-px overflow-hidden bg-footer px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div
            className="animate-on-scroll relative overflow-hidden rounded-3xl bg-[#22262E] px-8 py-12 text-white ring-1 ring-bronze/50 sm:px-14 sm:py-16"
            data-delay="0s"
            style={{ boxShadow: 'inset 0 0 44px 0 rgba(166,132,99,0.22), 0 30px 70px -24px rgba(0,0,0,0.6)' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(166,132,99,0.32), transparent 70%)' }}
            />
            <div className="relative flex flex-col gap-9 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
              <div className="max-w-md">
                <SplitHeading
                  lines={['Niet zeker welke', 'dienst je nodig hebt?']}
                  className="font-serif text-3xl/[1.3] font-light text-white sm:text-4xl/[1.3]"
                />
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  Plan een vrijblijvende kennismaking. We kijken samen wat het beste bij jouw
                  situatie past.
                </p>
              </div>
              <div className="flex w-full flex-none flex-col items-stretch gap-4 sm:w-auto sm:items-center">
                <a
                  href="/contact#formulier"
                  className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold"
                >
                  Plan een kennismaking
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
