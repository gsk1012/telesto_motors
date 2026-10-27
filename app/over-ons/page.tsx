import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import ParallaxImage from '../components/ParallaxImage'
import SplitHeading from '../components/SplitHeading'
import CredentialsBar from '../components/CredentialsBar'
import BrandsMarquee from '../components/BrandsMarquee'
import SocialInstagram from '../components/SocialInstagram'
import ValuesStage from './ValuesStage'

export const metadata: Metadata = {
  title: 'Over ons',
  description:
    'Telesto Motors is sinds 2008 het onafhankelijke autoadviesbureau voor particulieren en ondernemers. Geen voorraad, geen dealer: alleen jouw belang.',
  keywords: [
    'over Telesto Motors',
    'onafhankelijke autoadviseur',
    'autoadviesbureau',
    'autoadviseur Nederland',
    'EV advies specialist',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://telestomotors.nl/over-ons',
    siteName: 'Telesto Motors',
    title: 'Over ons | Telesto Motors',
    description:
      'Sinds 2008 het onafhankelijke autoadviesbureau dat altijd aan jouw kant staat. Geen voorraad, geen dealer: alleen jouw belang.',
    images: [
      {
        url: '/images/over-ons/hero-street.jpg',
        width: 2000,
        height: 1125,
        alt: 'Telesto Motors, over ons',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Over ons | Telesto Motors',
    description: 'Sinds 2008 het onafhankelijke autoadviesbureau dat altijd aan jouw kant staat.',
    images: ['/images/over-ons/hero-street.jpg'],
  },
  alternates: {
    canonical: 'https://telestomotors.nl/over-ons',
  },
}

const POINTS = [
  'Kennis van elk merk en segment, van stadsauto tot sportwagen',
  'Voor particulieren, ondernemers en kleine wagenparken',
  'Online of op locatie, helemaal in jouw tempo',
]

const TIMELINE = [
  {
    year: '2008',
    title: 'Waar het begon',
    body: 'Wat startte als het helpen van vrienden en familie bij hun auto-aankoop, groeide uit tot Telesto Motors. De missie was toen al glashelder: mensen behoeden voor een miskoop en ze laten rijden in een auto die echt bij ze past.',
  },
  {
    year: '2010 – 2018',
    title: 'Groei door vertrouwen',
    body: 'Tevreden klanten brachten nieuwe klanten. Zonder dure reclame, puur op aanbeveling, groeide Telesto van particulieren naar ook ondernemers en kleine wagenparken.',
  },
  {
    year: '2019',
    title: 'Elektrisch wordt volwassen',
    body: 'Toen de eerste betaalbare elektrische en hybride modellen de markt veroverden, verdiepten wij ons er volledig in. Inmiddels is EV-advies een van onze sterkste specialismen.',
  },
  {
    year: 'Vandaag',
    title: 'Dezelfde aanpak, meer kennis',
    body: 'Honderden geslaagde auto-aankopen later is de aanpak nog altijd hetzelfde: onafhankelijk, grondig en persoonlijk. Of je nu je eerste auto zoekt of je tiende, je krijgt steevast dezelfde aandacht.',
  },
]

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-bronze/15 text-bronze">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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

export default function OverOnsPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Over ons',
    url: 'https://telestomotors.nl/over-ons',
    mainEntity: {
      '@type': 'Organization',
      name: 'Telesto Motors',
      foundingDate: '2008',
      url: 'https://telestomotors.nl',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://telestomotors.nl' },
      { '@type': 'ListItem', position: 2, name: 'Over ons', item: 'https://telestomotors.nl/over-ons' },
    ],
  }

  return (
    <main className="bg-cream text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero banner ===== */}
      <section className="relative flex min-h-[62svh] w-full items-end overflow-hidden md:min-h-[88svh] md:items-center">
        <ParallaxImage
          src="/images/over-ons/hero-street.jpg"
          alt="Een premium sedan op een rustige Europese straat in het warme avondlicht"
          priority
          className="object-cover object-[72%_center] md:object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <SplitHeading
              as="h1"
              eager
              lines={['Over Telesto', 'Motors']}
              lineClassNames={[undefined, 'text-bronze']}
              className="font-sans text-4xl/[1.3] font-light uppercase tracking-[0.04em] text-white sm:text-5xl/[1.3] lg:text-6xl/[1.3]"
            />
            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              Sinds 2008 het onafhankelijke autoadviesbureau dat altijd aan jouw kant staat.
              Geen voorraad, geen dealer: alleen jouw belang.
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
                href="#wie-wij-zijn"
                className="btn-label group hidden items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/35 transition-all duration-200 hover:bg-white/10 hover:ring-white/70 active:scale-[0.98] sm:inline-flex"
              >
                Wie wij zijn
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

      {/* ===== Merken-marquee (same strip as the other pages) ===== */}
      <BrandsMarquee />

      {/* ===== Wie wij zijn (same split as the homepage "over" section) ===== */}
      <section id="wie-wij-zijn" className="-mt-px scroll-mt-24 overflow-hidden bg-[#191D23] text-white">
        <div className="grid items-stretch lg:grid-cols-[1fr_1fr]">
          <div className="order-2 flex flex-col lg:order-1">
            <p
              className="animate-on-scroll hidden text-center text-lg font-semibold uppercase tracking-widest text-bronze lg:block lg:pl-16 lg:pr-10 lg:pt-16 lg:pb-10 xl:pl-20"
              data-delay="0s"
            >
              Wie wij zijn
            </p>
            <div className="relative min-h-[300px] w-full flex-1 lg:min-h-[440px]">
              <Image
                src="/images/over-ons.jpg"
                alt="Een witte elektrische auto op een klinkerplein tussen moderne gebouwen"
                fill
                className="object-cover object-[55%_center]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="relative z-10 order-1 flex flex-col justify-between gap-10 px-8 py-14 lg:order-2 lg:py-16 lg:pl-14 lg:pr-14 xl:pl-20 xl:pr-20">
            <div>
              <p className="animate-on-scroll mb-4 text-lg font-semibold uppercase tracking-widest text-bronze lg:hidden" data-delay="0s">
                Wie wij zijn
              </p>
              <SplitHeading
                lines={['Slimmer', 'een auto', 'kopen.']}
                className="font-serif text-4xl/[1.35] font-light uppercase tracking-[0.12em] text-white sm:text-5xl/[1.35] lg:max-w-[48rem] lg:text-[3.5rem]/[1.3] xl:text-[4rem]/[1.3]"
              />
            </div>
            <div>
              <p className="animate-on-scroll text-lg leading-relaxed text-white/65" data-delay="0.15s">
                Telesto Motors is een onafhankelijk autoadviesbureau voor particulieren en ondernemers.
                Waar een dealer verdient aan de auto die hij verkoopt, verdienen wij aan goed advies. Dat
                geeft ons de vrijheid om te zeggen wat een verkoper nooit zegt: welke auto écht bij je
                past, wat hij waard is, en wanneer je beter nog even kunt doorzoeken.
              </p>
              <ul className="animate-on-scroll mt-8 space-y-4" data-delay="0.28s">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/diensten"
                className="btn-gold btn-label group animate-on-scroll mt-10 inline-flex w-fit items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
                data-delay="0.4s"
              >
                Bekijk onze diensten
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Kenmerken-balk (dark, closes the "Wie wij zijn" stage) ===== */}
      <CredentialsBar dark />

      {/* ===== Waar wij voor staan (scroll-podium: sticky full-screen stage per value) ===== */}
      <ValuesStage />

      {/* ===== Ons verhaal (full-bleed split, flush image right) ===== */}
      <section className="overflow-hidden bg-cream text-ink">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="order-2 px-6 py-16 sm:py-20 lg:order-1 lg:py-24 lg:pl-14 lg:pr-16 xl:pl-20">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Ons verhaal
            </p>
            <SplitHeading
              lines={['Gegroeid op', 'aanbeveling']}
              className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-ink sm:text-5xl/[1.3]"
            />
            <p className="animate-on-scroll mt-5 max-w-md text-lg leading-relaxed text-ink/65" data-delay="0.1s">
              Telesto Motors begon niet met een reclamecampagne, maar met één tevreden klant die het
              doorvertelde. Die aanpak is nooit veranderd.
            </p>

            <ol className="mt-10">
              {TIMELINE.map((item, i) => (
                <li
                  key={item.year}
                  className="animate-on-scroll relative flex gap-5 pb-9 last:pb-0"
                  data-delay={`${0.15 + i * 0.1}s`}
                >
                  {i < TIMELINE.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.375rem] top-11 h-[calc(100%-2.75rem)] w-px bg-bronze/25"
                    />
                  )}
                  <span className="relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#EDE3DC] ring-1 ring-bronze/25">
                    <span className="h-2.5 w-2.5 rounded-full bg-bronze" />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-bronze">{item.year}</p>
                    <h3 className="mt-1.5 text-xl font-light text-ink">{item.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ink/65">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-auto lg:min-h-[640px]">
            <Image
              src="/images/over-ons/moment.jpg"
              alt="Een tevreden klant bij de open deur van haar nieuwe auto, met de sleutel in de hand"
              fill
              className="object-cover object-[50%_22%] lg:object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

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
                  lines={['Benieuwd wat wij', 'voor jou kunnen doen?']}
                  className="font-serif text-3xl/[1.3] font-light text-white sm:text-4xl/[1.3]"
                />
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  Plan een vrijblijvende kennismaking. We vertellen je graag hoe onafhankelijk advies in
                  z&apos;n werk gaat.
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
