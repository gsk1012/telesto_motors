import type { Metadata } from 'next'
import Image from 'next/image'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import ParallaxImage from '../components/ParallaxImage'
import PrincipleBento, { PrincipleTile } from './PrincipleBento'

export const metadata: Metadata = {
  title: 'Over ons',
  description:
    'Telesto Motors is sinds 2008 de onafhankelijke autoadviseur van Nederland. Lees ons verhaal, onze werkwijze en maak kennis met oprichter Pawan Singh.',
  keywords: [
    'over Telesto Motors',
    'onafhankelijke autoadviseur',
    'Pawan Singh',
    'auto-advies verhaal',
    'autoadviseur Nederland',
    'EV advies specialist',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://telestomotors.nl/over-ons',
    siteName: 'Telesto Motors',
    title: 'Over ons — Telesto Motors',
    description:
      'Sinds 2008 de onafhankelijke autoadviseur die altijd aan jouw kant staat. Ons verhaal en oprichter Pawan Singh.',
    images: [
      {
        url: '/images/hero-bmw.png',
        width: 1200,
        height: 630,
        alt: 'Telesto Motors — Over ons',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Over ons — Telesto Motors',
    description:
      'Sinds 2008 de onafhankelijke autoadviseur die altijd aan jouw kant staat.',
    images: ['/images/hero-bmw.png'],
  },
  alternates: {
    canonical: 'https://telestomotors.nl/over-ons',
  },
}

const TIMELINE = [
  {
    year: '2008',
    title: 'Waar het begon',
    body: 'Wat startte als het helpen van vrienden en familie bij hun auto-aankoop, groeide uit tot Telesto Motors. De missie was toen al glashelder: mensen behoeden voor een miskoop en ze laten rijden in een auto die echt bij ze past.',
  },
  {
    year: '2010 t/m 2018',
    title: 'Groei door vertrouwen',
    body: 'Tevreden klanten brachten nieuwe klanten. Zonder dure reclame, puur op aanbeveling, breidde Telesto zich uit van particulieren naar ook ondernemers en kleine wagenparken.',
  },
  {
    year: '2019',
    title: 'Elektrisch wordt volwassen',
    body: 'Toen de eerste betaalbare elektrische en hybride modellen de markt veroverden, verdiepten wij ons er volledig in. Inmiddels is EV-advies een van onze sterkste specialismen: van actieradius en laadgedrag tot subsidies en restwaarde.',
  },
  {
    year: 'Vandaag',
    title: '15+ jaar verder',
    body: 'Honderden geslaagde auto-aankopen later is de aanpak nog altijd hetzelfde: onafhankelijk, grondig en persoonlijk. Of je nu je eerste auto zoekt of je tiende, je krijgt steevast dezelfde aandacht.',
  },
]

const PRINCIPLES: PrincipleTile[] = [
  {
    title: 'Onafhankelijk',
    body: 'Wij zijn aan geen enkel merk, dealer of importeur verbonden. Zonder verborgen commissies of voorkeursleveranciers weegt bij elk advies maar één belang mee: dat van jou.',
    area: 'lg:col-span-2',
    dark: true,
  },
  {
    title: 'Persoonlijk',
    body: 'Je krijgt één vast aanspreekpunt dat je situatie kent, je naam onthoudt en gewoon bereikbaar is.',
    area: 'lg:col-start-1 lg:row-start-2',
  },
  {
    title: 'Transparant',
    body: 'We vertellen je ook wat je liever niet hoort. Past een auto niet bij je budget of rijgedrag, dan zeggen we dat eerlijk.',
    area: 'lg:col-start-2 lg:row-start-2',
  },
  {
    title: 'Specialist in EV & hybride',
    body: 'Twijfel je tussen benzine, hybride of volledig elektrisch? Wij rekenen het eerlijk voor: laadgemak, actieradius, subsidies en de werkelijke kosten per kilometer. Zo kies je met cijfers, niet met onderbuikgevoel.',
    area: 'lg:col-start-3 lg:row-start-1 lg:row-span-2',
  },
]

const CREDENTIALS = [
  { accent: '15+ jaar', text: 'ervaring in elk segment' },
  { accent: '100%', text: 'onafhankelijk advies' },
  { accent: 'A tot Z', text: 'volledig ontzorgd' },
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
      founder: {
        '@type': 'Person',
        name: 'Pawan Singh',
        jobTitle: 'Oprichter',
      },
    },
  }

  return (
    <main className="bg-cream text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <StickyNav logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero (full-bleed immersive opening, bookends the dark finale) ===== */}
      <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-ink">
        <Image
          src="/images/over-ons/hero-street.jpg"
          alt="Een premium sedan op een rustige Europese straat in het warme avondlicht"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Scrims: left for the headline column, top for nav legibility, base for depth */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/55" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 py-28">
          <div className="max-w-3xl">
            <h1
              className="animate-fade-up font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: '0.05s' }}
            >
              Het verhaal achter<br className="hidden sm:block" /> de sleutels
            </h1>
            <p
              className="animate-fade-up mt-8 max-w-[54ch] text-lg leading-relaxed text-white/80"
              style={{ animationDelay: '0.18s' }}
            >
              De gemiddelde Nederlander koopt maar een handvol keer in z&apos;n leven een auto. Toch
              sta je er vaak alleen voor: tegenover een verkoper die het spel dagelijks speelt,
              tussen duizenden advertenties.
            </p>
            <p
              className="animate-fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-white/80"
              style={{ animationDelay: '0.28s' }}
            >
              Telesto Motors ontstond uit de overtuiging dat het ook anders kan. Wij draaien de
              rollen om: geen merk dat we moeten verkopen, geen target dat we moeten halen. Alleen
              jouw belang, van de eerste zoekopdracht tot de sleutel in je hand.
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
              style={{ animationDelay: '0.38s' }}
            >
              <a
                href="/contact#formulier"
                className="btn-label inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-bronze-dark active:scale-[0.98]"
              >
                Plan een kennismaking
              </a>
              <a
                href="tel:+31620929214"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                <PhoneIcon className="h-4 w-4" />
                +31 (0)6 20 92 92 14
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ons verhaal (vertical timeline) ===== */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            {/* Left: heading + intro */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2
                className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl"
                data-delay="0s"
              >
                Ons verhaal
              </h2>
              <p
                className="animate-on-scroll mt-6 max-w-md text-lg leading-relaxed text-ink/70"
                data-delay="0.1s"
              >
                Vijftien jaar onafhankelijk advies, en nog altijd dezelfde overtuiging als op dag een:
                dat niemand er alleen voor zou moeten staan bij zo&apos;n grote aankoop.
              </p>
              <p
                className="animate-on-scroll mt-4 max-w-md leading-relaxed text-ink/60"
                data-delay="0.18s"
              >
                Wat ooit klein begon, groeide uit tot een vast adres voor particulieren en ondernemers
                die zekerheid zoeken. Geen verkooppraat, maar iemand die meedenkt, doorvraagt en de
                tijd neemt. De auto-markt is in die jaren onherkenbaar veranderd; onze belofte aan jou
                geen seconde.
              </p>
              <p
                className="animate-on-scroll mt-6 font-serif text-xl font-medium text-bronze-dark"
                data-delay="0.26s"
              >
                Vier hoofdstukken, één rode draad.
              </p>
            </div>

            {/* Right: timeline */}
            <ol className="relative ml-1 border-l border-ink/15">
              {TIMELINE.map((item, i) => (
                <li
                  key={item.year}
                  className="animate-on-scroll relative pl-9 pb-12 last:pb-0 sm:pl-12"
                  data-delay={`${i * 0.1}s`}
                >
                  <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-bronze ring-4 ring-white" />
                  <p className="font-serif text-2xl font-semibold text-bronze">{item.year}</p>
                  <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink/65">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== Waar wij voor staan (spotlight bento) ===== */}
      <section className="bg-cream pt-24 pb-12 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <h2
            className="animate-on-scroll max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl"
            data-delay="0s"
          >
            Waar wij voor staan
          </h2>
          <p
            className="animate-on-scroll mt-5 max-w-xl text-lg leading-relaxed text-ink/65"
            data-delay="0.1s"
          >
            Vier uitgangspunten die elke afspraak, elk advies en elke aankoop sturen.
          </p>
          <div className="mt-12">
            <PrincipleBento tiles={PRINCIPLES} />
          </div>
        </div>
      </section>

      {/* ===== Oprichter: Pawan Singh (founder spotlight) ===== */}
      <section className="relative pt-12 pb-10 sm:py-28">
        {/* Bottom-half dark seam so the card lifts off it (3D effect), bridging into the dark finale */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 bg-ink" />
        <div className="relative z-10 mx-auto max-w-container px-6">
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-black/30 ring-1 ring-ink/5">
            <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-0">
              {/* Portrait */}
              <div className="animate-on-scroll relative px-8 pt-10 lg:p-12" data-delay="0s">
                <div className="relative mx-auto max-w-sm">
                  {/* Bronze offset accent behind the portrait */}
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-4 -left-4 h-full w-full rounded-3xl bg-bronze/20"
                  />
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src="/images/team/pawan-singh.jpg"
                      alt="Pawan Singh, oprichter van Telesto Motors"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 90vw"
                    />
                  </div>
                  {/* Floating badge (same language as homepage badge) */}
                  <div className="absolute -bottom-5 right-5 rounded-2xl bg-bronze px-6 py-4 text-white shadow-xl">
                    <p className="text-lg font-semibold leading-none">Oprichter</p>
                    <p className="mt-1 text-sm text-white/85">sinds 2008</p>
                  </div>
                </div>
              </div>

              {/* Letter from the founder */}
              <div className="animate-on-scroll px-8 pb-12 lg:py-14 lg:pl-4 lg:pr-14" data-delay="0.15s">
                <blockquote className="font-serif text-2xl font-medium leading-snug sm:text-3xl">
                  &ldquo;Ik gun iedereen dezelfde rust bij het kopen van een auto als waarmee ik er
                  zelf een zou uitkiezen.&rdquo;
                </blockquote>
                <p className="mt-7 leading-relaxed text-ink/70">
                  Pawan Singh begon Telesto Motors omdat hij keer op keer zag hoe mensen met de beste
                  bedoelingen de verkeerde auto kochten. Te duur, technisch niet in orde, of simpelweg
                  niet passend bij hun leven.
                </p>
                <p className="mt-4 leading-relaxed text-ink/70">
                  Met een scherp oog voor techniek, een uitgesproken liefde voor auto&apos;s en een
                  hekel aan verkooppraatjes maakte hij van onafhankelijk advies zijn vak. Vandaag staat
                  hij nog altijd persoonlijk aan het roer van elk advies.
                </p>

                {/* Signature block */}
                <div className="mt-9">
                  <p className="font-serif text-3xl font-medium leading-none text-ink">
                    Pawan Singh
                  </p>

                  <p className="mt-4 text-sm font-medium tracking-wide text-ink/55">
                    Oprichter van Telesto Motors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Onze staat van dienst (full-bleed EV credibility band) ===== */}
      <section className="relative isolate -mt-px flex min-h-[560px] items-center overflow-hidden bg-ink py-16 sm:min-h-[640px] sm:py-20 lg:min-h-[700px]">
        <ParallaxImage
          src="/images/over-ons/band-ev.jpg"
          alt="Een glanzende elektrische auto op een natte straat in het blauwe avonduur"
          className="object-cover object-center"
        />
        {/* Scrims: even darken for centered text, stronger bottom, and a top fade to blend the seam */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent sm:h-56" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="animate-on-scroll font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              data-delay="0s"
            >
              Onafhankelijk sinds 2008.<br className="hidden sm:block" /> En nooit van koers veranderd.
            </h2>
            <p
              className="animate-on-scroll mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
              data-delay="0.12s"
            >
              Honderden geslaagde auto-aankopen verder is er één constante gebleven: jouw belang staat
              voorop, van de eerste zoekopdracht tot de sleutel in je hand.
            </p>
          </div>

          <ul
            className="animate-on-scroll mx-auto mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-7 sm:mt-12 lg:flex-row lg:justify-center lg:gap-0"
            data-delay="0.24s"
          >
            {CREDENTIALS.map((c) => (
              <li
                key={c.text}
                className="whitespace-nowrap text-lg leading-none text-white/85 lg:ml-8 lg:border-l lg:border-white/20 lg:pl-8 lg:first:ml-0 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="font-serif font-semibold text-bronze">{c.accent}</span> {c.text}
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
                  Benieuwd wat wij voor jou kunnen betekenen?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                  Plan een vrijblijvende kennismaking. We vertellen je graag persoonlijk hoe
                  onafhankelijk advies in z&apos;n werk gaat.
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
      <footer className="-mt-px bg-ink py-16 text-white/80">
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
