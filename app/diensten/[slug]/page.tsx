import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StickyNav from '../../components/StickyNav'
import { DEFAULT_NAV } from '../../components/nav'
import ScrollAnimator from '../../components/ScrollAnimator'
import BenefitsSpotlight from '../../components/BenefitsSpotlight'
import ParallaxImage from '../../components/ParallaxImage'
import { SERVICES, getService } from '../services'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) {
    return { title: 'Dienst niet gevonden' }
  }

  const url = `https://telestomotors.nl/diensten/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      url,
      siteName: 'Telesto Motors',
      title: `${service.metaTitle} | Telesto Motors`,
      description: service.metaDescription,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `Telesto Motors, ${service.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.metaTitle} | Telesto Motors`,
      description: service.metaDescription,
      images: [service.image],
    },
    alternates: {
      canonical: url,
    },
  }
}

/* ---------- Inline icon primitives (project idiom: minimal stroked SVG) ---------- */

function ArrowLeftIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) {
    notFound()
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    areaServed: { '@type': 'Country', name: 'Nederland' },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Telesto Motors',
      url: 'https://telestomotors.nl',
    },
    url: `https://telestomotors.nl/diensten/${service.slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://telestomotors.nl' },
      { '@type': 'ListItem', position: 2, name: 'Diensten', item: 'https://telestomotors.nl/diensten' },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://telestomotors.nl/diensten/${service.slug}`,
      },
    ],
  }

  return (
    <main className="bg-cream text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero (full-bleed parallax photo, copy weighted to the left) ===== */}
      <section className="relative flex min-h-[72svh] w-full items-end overflow-hidden md:min-h-[80svh] md:items-center">
        <ParallaxImage
          src={service.image}
          alt={`Telesto Motors, ${service.title}`}
          priority
          className="object-cover object-center"
        />
        {/* Layered scrims: left emphasis behind the copy, bottom fade for the mobile layout */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-16 md:pb-0">
          <div className="max-w-2xl">
            <Link
              href="/diensten"
              className="animate-fade-up inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
              style={{ animationDelay: '0.02s' }}
            >
              <ArrowLeftIcon />
              Alle diensten
            </Link>
            <h1
              className="animate-fade-up mt-5 font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-white [text-wrap:balance] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '0.08s' }}
            >
              {service.title}
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/85"
              style={{ animationDelay: '0.18s' }}
            >
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ===== Intro + content (editorial layout with sticky contact rail) ===== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Reading column */}
            <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
              <p
                className="animate-on-scroll font-serif text-2xl font-medium leading-[1.45] text-ink/90 [text-wrap:pretty] sm:text-[1.7rem]"
                data-delay="0s"
              >
                {service.intro}
              </p>

              {service.sections.map((sec, i) => (
                <div key={sec.heading} className="animate-on-scroll mt-12" data-delay={`${0.1 + i * 0.1}s`}>
                  <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {sec.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/70 [text-wrap:pretty]">
                    {sec.paragraphs.map((p, pi) => (
                      <p key={pi}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky contact rail */}
            <aside className="order-2 lg:order-1 lg:col-span-4">
              <div
                className="animate-on-scroll rounded-2xl border border-ink/10 bg-white p-7 shadow-sm lg:sticky lg:top-28"
                data-delay="0.05s"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-dark">
                  Plan je advies
                </p>
                <p className="mt-4 font-serif text-xl font-semibold leading-snug">
                  Liever direct sparren over jouw situatie?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  Plan vrijblijvend een kennismaking. We bespreken je wensen en hoe we je het beste verder helpen.
                </p>
                <Link
                  href="/contact#formulier"
                  className="btn-label mt-6 inline-flex w-full items-center justify-center rounded-full bg-bronze-dark px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-ink active:scale-[0.98]"
                >
                  Plan een kennismaking
                </Link>
                <a
                  href="tel:+31620929214"
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  <PhoneIcon className="h-4 w-4 text-bronze-dark" />
                  +31 (0)6 20 92 92 14
                </a>
                <div className="mt-6 border-t border-ink/10 pt-5 text-xs text-ink/45">
                  Onafhankelijk auto-advies sinds 2008
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== Process steps (numbered stepper, hairline rail) ===== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <h2 className="animate-on-scroll max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl" data-delay="0s">
            Zo gaan we te werk
          </h2>
          <p className="animate-on-scroll mt-4 max-w-xl text-lg text-ink/55" data-delay="0.1s">
            In {service.steps.length} stappen van eerste gesprek tot een keuze waar je achter staat.
          </p>

          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <li key={step.title} className="animate-on-scroll" data-delay={`${0.1 + i * 0.1}s`}>
                <div className="flex items-center">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-bronze/10 text-base font-semibold text-bronze-dark ring-1 ring-bronze/35">
                    {i + 1}
                  </span>
                  {/* Rail runs edge-to-edge into the column gap so it touches the next badge */}
                  {i < service.steps.length - 1 && (
                    <span aria-hidden="true" className="hidden h-px flex-1 -mr-8 bg-bronze/25 lg:block" />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Benefits (split statement + interactive benefit cards) ===== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="animate-on-scroll lg:col-span-4" data-delay="0s">
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Wat het je oplevert
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                Je schakelt ons in voor rust, zekerheid en een keuze waar je niet op terugkomt,
                met een adviseur die volledig aan jouw kant staat.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Wij nemen het uitzoekwerk uit handen, jij houdt de regie. Dit is wat onze aanpak
                je concreet oplevert.
              </p>
            </div>

            <div className="animate-on-scroll lg:col-span-7 lg:col-start-6 lg:h-full" data-delay="0.1s">
              <BenefitsSpotlight benefits={service.benefits} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Other services (all remaining services + overview tile, exact 6-cell grid) ===== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <h2 className="animate-on-scroll font-serif text-3xl font-semibold tracking-tight sm:text-4xl" data-delay="0s">
            Andere diensten
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((other, i) => (
              <Link
                key={other.slug}
                href={`/diensten/${other.slug}`}
                className="animate-on-scroll group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-delay={`${0.08 + i * 0.08}s`}
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold">{other.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{other.shortBody}</p>
                  <span className="btn-label mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-bronze-dark transition-colors group-hover:text-ink">
                    Lees meer
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
            {/* Dark overview tile fills the sixth cell and links back to the full range */}
            <Link
              href="/diensten"
              className="animate-on-scroll group flex flex-col justify-between rounded-2xl bg-ink p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              data-delay="0.48s"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold leading-snug">
                  Liever alles naast elkaar?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Bekijk het complete overzicht en ontdek welke dienst, of combinatie van
                  diensten, bij jouw situatie past.
                </p>
              </div>
              <span className="btn-label mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze transition-colors group-hover:text-white">
                Alle diensten
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Closing CTA (full-bleed image finale that flows into the footer) ===== */}
      <section className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-ink py-20 sm:min-h-[560px] sm:py-24">
        <ParallaxImage src={service.image} alt="" className="object-cover object-center" />
        {/* Scrims: even darken for the centered copy, stronger bottom to blend into the footer */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="animate-on-scroll font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white [text-wrap:balance] sm:text-5xl"
              data-delay="0s"
            >
              {service.ctaTitle}
            </h2>
            <p
              className="animate-on-scroll mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80"
              data-delay="0.12s"
            >
              Plan vrijblijvend een kennismaking, of bel ons direct. Je hoort meteen wat we in
              jouw situatie voor je kunnen doen.
            </p>
            <div
              className="animate-on-scroll mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
              data-delay="0.22s"
            >
              <Link
                href="/contact#formulier"
                className="btn-label inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-all duration-200 hover:bg-cream active:scale-[0.98]"
              >
                Plan een kennismaking
              </Link>
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
        <div className="mx-auto mt-12 max-w-container flex flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
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
