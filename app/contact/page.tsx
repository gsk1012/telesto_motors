import type { Metadata } from 'next'
import Image from 'next/image'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import ContactTabs from '../components/ContactTabs'
import FaqAccordion, { type FaqItem } from '../components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Neem contact op met Telesto Motors: stel je vraag via het formulier, plan direct een vrijblijvende kennismaking, of bel, app of mail ons. Reactie binnen één werkdag.',
  keywords: [
    'contact Telesto Motors',
    'autoadviseur contact',
    'afspraak auto-advies',
    'kennismakingsgesprek auto',
    'onafhankelijk auto-advies contact',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://telestomotors.nl/contact',
    siteName: 'Telesto Motors',
    title: 'Contact | Telesto Motors',
    description:
      'Stel je vraag of plan direct een vrijblijvende kennismaking. Bellen, appen of mailen kan ook. Reactie binnen één werkdag.',
    images: [
      {
        url: '/images/contact/hero.jpg',
        width: 2752,
        height: 1536,
        alt: 'Telesto Motors — Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Telesto Motors',
    description:
      'Stel je vraag of plan direct een vrijblijvende kennismaking. Reactie binnen één werkdag.',
    images: ['/images/contact/hero.jpg'],
  },
  alternates: {
    canonical: 'https://telestomotors.nl/contact',
  },
}

const FAQS: FaqItem[] = [
  {
    question: 'Hoe snel krijg ik reactie?',
    answer:
      'Binnen één werkdag, vaak al dezelfde dag. Heb je haast? Bel of app ons dan even, dat is de snelste route.',
  },
  {
    question: 'Wat kost een kennismakingsgesprek?',
    answer:
      'Niets. De kennismaking is altijd vrijblijvend: we luisteren naar je situatie en vertellen eerlijk of en hoe we je kunnen helpen. Daarna beslis jij of we verdergaan.',
    link: { href: '/plans', label: 'Bekijk de pakketten' },
  },
  {
    question: 'Moet ik al weten welke auto ik zoek?',
    answer:
      'Nee, juist niet. Twijfel je nog tussen merken, modellen of brandstoffen, dan is dat precies waar wij bij helpen. Geef het aan in het formulier en we denken vanaf de eerste stap met je mee.',
    link: { href: '/diensten', label: 'Bekijk onze diensten' },
  },
  {
    question: "Kan ik ook 's avonds of in het weekend terecht?",
    answer:
      'Ja. Doordeweeks zijn we op afspraak bereikbaar tot 22.00 uur, op zaterdag tot 16.00 uur en op zondag op afspraak. Zo plan je een gesprek gewoon om je werk heen.',
  },
  {
    question: 'Werken jullie door heel Nederland?',
    answer:
      'Ja, we helpen particulieren en ondernemers door heel Nederland. Een groot deel van het contact kan telefonisch of online, dus waar je woont maakt voor het advies niet uit.',
  },
]

const HOURS = [
  { day: 'Ma t/m vr', time: '09.00 - 22.00' },
  { day: 'Zaterdag', time: '09.30 - 16.00' },
  { day: 'Zondag', time: 'Op afspraak' },
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

function MailIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  )
}

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.97l6.272-1.647A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.575-.478-5.083-1.315l-.364-.214-3.724.977.995-3.635-.236-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

function ChevronRightIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

const CHANNELS = [
  {
    label: 'Bel ons',
    value: '+31 (0)6 20 92 92 14',
    href: 'tel:+31620929214',
    external: false,
    icon: <PhoneIcon className="h-5 w-5" />,
  },
  {
    label: 'WhatsApp',
    value: 'Handig voor korte vragen',
    href: 'https://wa.me/31620929214',
    external: true,
    icon: <WhatsAppIcon className="h-5 w-5" />,
  },
  {
    label: 'E-mail',
    value: 'info@telestomotors.nl',
    href: 'mailto:info@telestomotors.nl',
    external: false,
    icon: <MailIcon className="h-5 w-5" />,
  },
]

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact',
    url: 'https://telestomotors.nl/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Telesto Motors',
      url: 'https://telestomotors.nl',
      telephone: '+31620929214',
      email: 'info@telestomotors.nl',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+31620929214',
        email: 'info@telestomotors.nl',
        availableLanguage: ['Dutch'],
      },
    },
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://telestomotors.nl' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://telestomotors.nl/contact' },
    ],
  }

  return (
    <main className="bg-cream text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StickyNav logoHref="/" ctaHref="#formulier" />

      {/* ===== Hero (full-bleed immersive opening, same language as over-ons) ===== */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink sm:items-center">
        <Image
          src="/images/contact/hero.jpg"
          alt="Autoadviseur van Telesto Motors telefoneert naast een premium sedan in het warme avondlicht"
          fill
          priority
          className="object-cover object-[68%_center] sm:object-center"
          sizes="100vw"
        />
        {/* Scrims: left for the headline column, top for nav legibility, base for depth */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/15" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/60 sm:to-ink/50" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-24 pt-28 sm:pb-16">
          <div className="max-w-2xl">
            <h1
              className="animate-fade-up font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white [text-wrap:balance] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '0.05s' }}
            >
              Neem contact op
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-[46ch] text-lg leading-relaxed text-white/80 sm:mt-7"
              style={{ animationDelay: '0.18s' }}
            >
              Een vraag over je zoektocht of klaar om te beginnen? Je krijgt binnen één werkdag
              persoonlijk antwoord.
            </p>
            <div
              className="animate-fade-up mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.3s' }}
            >
              <a
                href="#formulier"
                className="btn-label inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-bronze-dark active:scale-[0.98]"
              >
                Stel je vraag
              </a>
              <a
                href="tel:+31620929214"
                className="btn-label inline-flex items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <PhoneIcon className="h-4 w-4 text-bronze" />
                +31 (0)6 20 92 92 14
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Formulier (zelfde ContactTabs als op de homepage) ===== */}
      <section id="formulier" className="scroll-mt-24 bg-cream py-24 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2
              className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl"
              data-delay="0s"
            >
              Vertel ons wat je zoekt
            </h2>
            <p
              className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65"
              data-delay="0.12s"
            >
              Stel je vraag via het formulier of kies meteen een moment in de agenda.
              Beide volledig vrijblijvend.
            </p>
          </div>

          <div className="animate-on-scroll mt-12 w-full" data-delay="0.24s">
            <ContactTabs />
          </div>
        </div>
      </section>

      {/* ===== Veelgestelde vragen ===== */}
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

      {/* ===== Liever direct contact? (dark finale into the footer) ===== */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* Left: heading + direct channels */}
            <div>
              <h2
                className="animate-on-scroll font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl"
                data-delay="0s"
              >
                Liever direct contact?
              </h2>
              <p
                className="animate-on-scroll mt-5 max-w-xl text-lg leading-relaxed text-white/75"
                data-delay="0.1s"
              >
                Bellen, appen of mailen kan natuurlijk ook. Je krijgt altijd direct een adviseur
                te spreken, geen keuzemenu.
              </p>

              <div className="mt-10 flex flex-col gap-3">
                {CHANNELS.map((channel, i) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="animate-on-scroll group flex items-center gap-5 rounded-2xl bg-white/[0.04] px-6 py-5 ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/[0.09]"
                    data-delay={`${0.16 + i * 0.08}s`}
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-bronze/20 text-bronze">
                      {channel.icon}
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{channel.label}</span>
                      <span className="mt-0.5 block text-sm text-white/60">{channel.value}</span>
                    </span>
                    <ChevronRightIcon className="ml-auto h-4 w-4 flex-none text-white/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-bronze" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: openingstijden over warm detail photo */}
            <div className="animate-on-scroll" data-delay="0.2s">
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/contact/bereikbaar.jpg"
                    alt="Telefoon, autosleutel en een kop koffie op een bureau in warm avondlicht"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 sm:p-9">
                    <p className="font-serif text-2xl font-semibold text-white">Openingstijden</p>
                    <ul className="mt-5 space-y-2.5">
                      {HOURS.map((row) => (
                        <li key={row.day} className="flex items-baseline justify-between gap-6 text-[15px]">
                          <span className="text-white/70">{row.day}</span>
                          <span className="font-medium text-white">{row.time}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm leading-relaxed text-white/60">
                      Bezoek op afspraak. Ook &apos;s avonds bereikbaar voor wie overdag werkt.
                    </p>
                  </div>
                </div>
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
