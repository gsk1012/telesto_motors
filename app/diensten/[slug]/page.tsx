import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StickyNav from '../../components/StickyNav'
import { DEFAULT_NAV } from '../../components/nav'
import ScrollAnimator from '../../components/ScrollAnimator'
import ParallaxImage from '../../components/ParallaxImage'
import SplitHeading from '../../components/SplitHeading'
import SocialInstagram from '../../components/SocialInstagram'
import { PLANS } from '../../lib/pakketten'
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <StickyNav links={DEFAULT_NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Hero banner (same parallax banner as the other pages) ===== */}
      <section className="relative flex min-h-[62svh] w-full items-end overflow-hidden md:min-h-[88svh] md:items-center">
        <ParallaxImage
          src={service.image}
          alt={`Telesto Motors, ${service.title}`}
          priority
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-2xl">
            <nav aria-label="Kruimelpad" className="animate-fade-up mb-5" style={{ animationDelay: '0.02s' }}>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <li>
                  <Link href="/" className="text-white/65 transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/35">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href="/diensten" className="text-white/65 transition-colors hover:text-white">
                    Diensten
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/35">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </li>
                <li>
                  <span aria-current="page" className="font-medium text-bronze">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>
            <SplitHeading
              as="h1"
              eager
              lines={service.heroLines}
              lineClassNames={service.heroLines.map((_, i) =>
                i === service.heroLines.length - 1 ? 'text-bronze' : undefined,
              )}
              className="font-sans text-[2rem]/[1.3] font-light uppercase tracking-[0.04em] text-white sm:text-5xl/[1.3] lg:text-6xl/[1.3]"
            />
            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              {service.tagline}
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: '0.32s' }}
            >
              <a
                href="#uitleg"
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Wat houdt het in
              </a>
              <Link
                href="/pakketten"
                className="btn-label group hidden items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/35 transition-all duration-200 hover:bg-white/10 hover:ring-white/70 active:scale-[0.98] sm:inline-flex"
              >
                Bekijk de pakketten
                <ArrowRightIcon className="h-4 w-4 text-bronze transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Wat houdt het in (drop-cap lead left; photo right with a frosted checklist overlapping its edge) ===== */}
      <section id="uitleg" className="relative -mt-px scroll-mt-24 overflow-hidden bg-[#191D23] py-20 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(166,132,99,0.14), transparent 68%)' }}
        />

        <div className="relative z-10 mx-auto grid max-w-container items-stretch gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:self-center">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Wat houdt het in
            </p>
            <SplitHeading
              lines={service.headline}
              className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-white sm:text-5xl/[1.3] lg:text-[2.75rem]/[1.3]"
            />
            <p
              className="animate-on-scroll mt-8 text-xl/[1.6] font-light text-white/90 [text-wrap:pretty] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-[4.5rem]/[0.8] first-letter:font-light first-letter:text-bronze sm:text-[1.375rem]/[1.6]"
              data-delay="0.1s"
            >
              {service.intro}
            </p>
            <div className="animate-on-scroll mt-6 space-y-4 leading-relaxed text-white/60 [text-wrap:pretty]" data-delay="0.2s">
              {service.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Photo stretches to the text column height, so neither side leaves dead space */}
          <div className="flex flex-col lg:col-span-6">
            <div className="animate-on-scroll relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10 lg:ml-auto lg:aspect-auto lg:min-h-[400px] lg:w-[88%] lg:flex-1" data-delay="0.1s">
              <Image
                src={service.detailImage}
                alt={service.detailImageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            {/* Frosted checklist hangs over the photo's lower edge */}
            <div
              className="animate-on-scroll relative z-10 mx-4 -mt-28 rounded-3xl bg-[#22262E]/75 p-7 ring-1 ring-white/15 backdrop-blur-xl sm:mx-10 sm:-mt-32 sm:p-8 lg:mx-0 lg:-mt-40 lg:w-[72%]"
              data-delay="0.3s"
              style={{ boxShadow: '0 30px 80px -30px rgba(0,0,0,0.7), inset 0 0 30px 0 rgba(166,132,99,0.12)' }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-bronze">Waar we op letten</p>
              <ul className="mt-5 space-y-4">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-bronze text-white">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="leading-relaxed text-white/85">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Zo pakken we het aan (horizontal route; swipeable on mobile, final stop in charcoal) ===== */}
      <section className="overflow-hidden bg-cream py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-container px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                Zo pakken we het aan
              </p>
              <SplitHeading
                lines={['Stap voor stap,', 'zonder verrassingen']}
                className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-ink sm:text-5xl/[1.3]"
              />
            </div>
            <p className="animate-on-scroll max-w-sm text-lg leading-relaxed text-ink/65" data-delay="0.1s">
              Vier vaste stappen, zodat je altijd weet waar we staan en wat er volgt.
            </p>
          </div>

          <ol
            className="animate-on-scroll relative -mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            data-delay="0.15s"
          >
            {/* Route line connecting the stops (desktop) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[1.375rem] right-0 top-[1.375rem] hidden h-px bg-gradient-to-r from-bronze/70 via-bronze/40 to-bronze/70 lg:block"
            />
            {service.steps.map((step, i) => {
              const last = i === service.steps.length - 1
              return (
                <li key={step.title} className="relative w-[78%] flex-none snap-start sm:w-[44%] lg:w-auto">
                  <span
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ring-[6px] ring-cream ${
                      last ? 'bg-bronze text-white' : 'bg-[#191D23] text-bronze'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div
                    className={`mt-6 flex h-[calc(100%-4.25rem)] flex-col rounded-2xl p-6 sm:p-7 ${
                      last ? 'bg-[#191D23] text-white' : 'bg-paper ring-1 ring-ink/[0.06]'
                    }`}
                    style={last ? { boxShadow: 'inset 0 0 30px 0 rgba(166,132,99,0.22)' } : undefined}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${last ? 'text-bronze' : 'text-bronze-dark'}`}>
                      Stap {i + 1}
                    </p>
                    <h3 className={`mt-3 text-xl font-light ${last ? 'text-white' : 'text-ink'}`}>{step.title}</h3>
                    <p className={`mt-2 leading-relaxed ${last ? 'text-white/70' : 'text-ink/65'}`}>{step.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ===== In welk pakket ("dark showroom", same stage as /pakketten) ===== */}
      <section className="relative overflow-hidden bg-[#191D23] py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#191D23] via-[#191D23] to-[#14181E]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[60%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(166,132,99,0.16), transparent 68%)' }}
        />

        <div className="relative z-10 mx-auto max-w-container px-6">
          <div className="max-w-2xl">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              In welk pakket
            </p>
            <SplitHeading
              lines={['Onderdeel van', 'onze pakketten']}
              className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-white sm:text-5xl/[1.3]"
            />
            <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-white/65" data-delay="0.1s">
              We werken niet met losse diensten, maar met complete trajecten. {service.packageNote}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan, i) => {
              const included = service.packages.includes(plan.tier)
              return (
                <article
                  key={plan.tier}
                  className={`animate-on-scroll relative flex flex-col rounded-2xl p-8 ${
                    included ? 'bg-[#22262E] ring-1 ring-bronze/60' : 'bg-[#20242B]/60 ring-1 ring-white/10'
                  }`}
                  data-delay={`${0.08 + i * 0.12}s`}
                  style={included ? { boxShadow: 'inset 0 0 26px 0 rgba(166,132,99,0.22)' } : undefined}
                >
                  <span
                    className={`mb-5 inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      included ? 'bg-bronze/15 text-bronze' : 'bg-white/[0.05] text-white/40'
                    }`}
                  >
                    {included ? 'Inbegrepen' : 'Niet inbegrepen'}
                  </span>
                  <h3 className={`font-serif text-2xl font-light leading-snug ${included ? 'text-white' : 'text-white/45'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.18em] ${included ? 'text-white/50' : 'text-white/30'}`}>
                    {plan.scope}
                  </p>
                  <p className={`mt-4 text-sm leading-relaxed ${included ? 'text-white/65' : 'text-white/35'}`}>
                    {plan.description}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="animate-on-scroll mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6" data-delay="0.2s">
            <Link
              href="/pakketten"
              className="btn-gold btn-label group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
            >
              Vergelijk de pakketten
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Andere diensten (image tiles, same photo language as the diensten panels) ===== */}
      <section className="bg-cream py-20 text-ink sm:py-24">
        <div className="mx-auto max-w-container px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                Meer over ons werk
              </p>
              <SplitHeading
                lines={['Andere diensten']}
                className="mt-3 font-serif text-4xl/[1.3] font-light uppercase text-ink sm:text-5xl/[1.3]"
              />
            </div>
            <Link
              href="/diensten"
              className="btn-label group animate-on-scroll inline-flex items-center gap-1.5 text-sm font-semibold text-bronze-dark transition-colors hover:text-ink"
              data-delay="0.1s"
            >
              Alle diensten
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
            {otherServices.map((other, i) => (
              <Link
                key={other.slug}
                href={`/diensten/${other.slug}`}
                className="animate-on-scroll group relative block h-56 overflow-hidden rounded-2xl sm:h-auto sm:aspect-[3/4]"
                data-delay={`${0.08 + i * 0.08}s`}
              >
                <Image
                  src={other.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-lg font-medium leading-snug text-white">{other.title}</h3>
                  <span className="mt-3 block h-0.5 w-10 bg-bronze transition-all duration-300 group-hover:w-16" />
                </div>
              </Link>
            ))}
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
                  lines={['Benieuwd welk pakket', 'bij je past?']}
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
