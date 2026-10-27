import type { Metadata } from 'next'
import Image from 'next/image'
import StickyNav from '../components/StickyNav'
import { DEFAULT_NAV } from '../components/nav'
import ScrollAnimator from '../components/ScrollAnimator'
import ParallaxImage from '../components/ParallaxImage'
import SplitHeading from '../components/SplitHeading'
import BrandsMarquee from '../components/BrandsMarquee'
import CredentialsBar from '../components/CredentialsBar'
import FaqSection from '../components/FaqSection'
import SocialInstagram from '../components/SocialInstagram'
import ContactTabs from '../components/ContactTabs'
import { type FaqItem } from '../components/FaqAccordion'

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
        width: 2000,
        height: 1116,
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
    value: '+31 (0)6 20 77 99 77',
    href: 'tel:+31620779977',
    external: false,
    icon: <PhoneIcon className="h-5 w-5" />,
  },
  {
    label: 'WhatsApp',
    value: 'Handig voor korte vragen',
    href: 'https://wa.me/31620779977',
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
      telephone: '+31620779977',
      email: 'info@telestomotors.nl',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+31620779977',
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
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="#formulier" />

      {/* ===== Hero banner (same parallax banner as the other pages) ===== */}
      <section className="relative flex min-h-[62svh] w-full items-end overflow-hidden md:min-h-[88svh] md:items-center">
        <ParallaxImage
          src="/images/contact/hero.jpg"
          alt="Autoadviseur van Telesto Motors telefoneert naast een premium sedan in het warme avondlicht"
          priority
          className="object-cover object-[68%_center] md:object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <SplitHeading
              as="h1"
              eager
              lines={['Neem', 'contact op']}
              lineClassNames={[undefined, 'text-bronze']}
              className="font-sans text-4xl/[1.3] font-light uppercase tracking-[0.04em] text-white sm:text-5xl/[1.3] lg:text-6xl/[1.3]"
            />
            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              Een vraag over je zoektocht of klaar om te beginnen? Je krijgt binnen één werkdag
              persoonlijk antwoord.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.32s' }}
            >
              <a
                href="#formulier"
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Stel je vraag
              </a>
              <a
                href="#direct-contact"
                className="btn-label group hidden items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/35 transition-all duration-200 hover:bg-white/10 hover:ring-white/70 active:scale-[0.98] sm:inline-flex"
              >
                Direct contact
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
      <BrandsMarquee light />

      {/* ===== Formulier (zelfde ContactTabs als op de homepage) ===== */}
      <section id="formulier" className="scroll-mt-24 bg-cream pt-20 pb-20 sm:pt-24 sm:pb-24">
        <div className="mx-auto max-w-container px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Stel je vraag
            </p>
            <SplitHeading
              lines={['Vertel ons wat', 'je zoekt']}
              className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-ink sm:text-5xl/[1.3]"
            />
            <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65" data-delay="0.12s">
              Stel je vraag via het formulier of kies meteen een moment in de agenda.
              Beide volledig vrijblijvend.
            </p>
          </div>

          <div className="animate-on-scroll mt-12 w-full" data-delay="0.24s">
            <ContactTabs />
          </div>
        </div>
      </section>

      {/* ===== Direct contact (full-bleed split, same language as "Wie wij zijn") ===== */}
      <section id="direct-contact" className="scroll-mt-24 overflow-hidden bg-[#191D23] text-white">
        <div className="grid items-stretch lg:grid-cols-2">
          {/* Flush photo with the openingstijden settled into its base */}
          <div className="relative order-2 min-h-[460px] w-full lg:order-1 lg:min-h-[640px]">
            <Image
              src="/images/contact/bereikbaar.jpg"
              alt="Telefoon, autosleutel en een kop koffie op een bureau in warm avondlicht"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#191D23] via-[#191D23]/40 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 lg:px-14 lg:pb-14 xl:px-20">
              <div className="animate-on-scroll max-w-sm" data-delay="0.2s">
                <p className="text-lg font-semibold uppercase tracking-widest text-bronze">Openingstijden</p>
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

          {/* Heading + direct channels */}
          <div className="order-1 flex flex-col justify-center px-6 py-16 sm:py-20 lg:order-2 lg:py-24 lg:pl-14 lg:pr-16 xl:pl-20 xl:pr-20">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Direct contact
            </p>
            <SplitHeading
              lines={['Liever direct', 'contact?']}
              className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-white sm:text-5xl/[1.3]"
            />
            <p className="animate-on-scroll mt-5 max-w-md text-lg leading-relaxed text-white/65" data-delay="0.1s">
              Bellen, appen of mailen kan natuurlijk ook. Je krijgt altijd direct een adviseur
              te spreken, geen keuzemenu.
            </p>

            <div className="mt-10 flex max-w-lg flex-col gap-3">
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
        </div>
      </section>

      {/* ===== Kenmerken-balk (dark, closes the direct-contact stage) ===== */}
      <CredentialsBar dark />

      {/* ===== Veelgestelde vragen (shared two-column FAQ, contact-specific questions) ===== */}
      <FaqSection blurb="jouw situatie." light items={FAQS} />

      {/* ===== Social / Instagram (dark finale into the footer) ===== */}
      <SocialInstagram />

      <ScrollAnimator />
    </main>
  )
}
