import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "./diensten/services";
import ContactTabs from "./components/ContactTabs";
import StickyNav from "./components/StickyNav";
import { DEFAULT_NAV } from "./components/nav";
import ScrollAnimator from "./components/ScrollAnimator";
import SocialInstagram from "./components/SocialInstagram";
import ReviewsWall from "./components/ReviewsWall";
import PromiseShowcase from "./components/PromiseShowcase";

export default function Home() {
  return (
    <main id="home" className="bg-cream text-ink">
      {/* ===== Navbar ===== */}
      <StickyNav />

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[85svh] w-full items-end overflow-hidden md:items-center">
        <video
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bmw.png"
        >
          <source src="/video/hero.mp4?v=5" type="video/mp4" />
        </video>
        {/* scrims */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-14 md:pb-0">
          <div className="max-w-3xl">
            <h1
              className="animate-fade-up font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-8xl"
              style={{ animationDelay: '0.05s' }}
            >
              Jouw droomauto,
              <br />
              zonder gedoe
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-sm text-base text-white/80 sm:max-w-xl sm:text-lg"
              style={{ animationDelay: '0.3s' }}
            >
              Onafhankelijk advies, technische keuring en prijsonderhandeling.
              Wij luisteren naar jouw wensen en regelen de rest.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-row items-center gap-3"
              style={{ animationDelay: '0.5s' }}
            >
              <a
                href="#contact"
                className="btn-label inline-flex items-center justify-center whitespace-nowrap rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-bronze-dark"
              >
                Afspraak maken
              </a>
              <a
                href="#diensten"
                className="btn-label inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                Bekijk diensten
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Diensten ===== */}
      <section
        id="diensten"
        className="pt-24 pb-24"
        style={{ background: 'linear-gradient(to bottom, #F7F0EC 55%, #ffffff 55%)' }}
      >
        <div className="mx-auto max-w-container px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl" data-delay="0s">
                Van zoektocht tot sleutels
              </h2>
              <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65" data-delay="0.15s">
                Een auto kopen is een van de grootste aankopen die je doet.
                Wij begeleiden je van het eerste gesprek tot de overhandeling
                van de sleutels. Onafhankelijk, grondig en altijd met jouw
                belang voorop.
              </p>
            </div>
            <div className="animate-on-scroll flex-none" data-delay="0.25s">
              <Link
                href="/diensten"
                className="btn-label group inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:bg-bronze hover:text-white"
              >
                Bekijk alle diensten
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.slice(0, 3).map((d, i) => (
              <Link
                key={d.slug}
                href={`/diensten/${d.slug}`}
                className="animate-on-scroll group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-delay={`${0.1 + i * 0.12}s`}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-semibold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/65">{d.shortBody}</p>
                  <span className="btn-label mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze transition-colors group-hover:text-bronze-dark">
                    Lees meer
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Kenmerken-balk (credentials) ===== */}
      <section className="bg-cream">
        <div className="mx-auto max-w-container px-6 py-11 sm:py-12">
          <ul className="animate-on-scroll grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4 lg:flex-nowrap lg:justify-between lg:gap-x-6" data-delay="0s">
            {[
              "Expertise sinds 2008",
              "Vakkundig advies",
              "Persoonlijke aandacht",
              "5+ jaar ervaring in EV's en hybrides",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 sm:whitespace-nowrap"
              >
                <svg
                  className="h-5 w-5 flex-none text-bronze"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11.48 3.5a.6.6 0 011.04 0l2.09 5.03a.56.56 0 00.48.35l5.43.44c.5.04.7.66.32.99l-4.14 3.54a.56.56 0 00-.18.56l1.27 5.3a.56.56 0 01-.84.6l-4.65-2.84a.56.56 0 00-.58 0l-4.65 2.84a.56.56 0 01-.84-.6l1.27-5.3a.56.56 0 00-.18-.56L3.16 10.7a.56.56 0 01.32-.99l5.43-.44a.56.56 0 00.48-.35z" />
                </svg>
                <span className="text-sm font-medium text-ink sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Onze belofte (kenmerken) ===== */}
      <PromiseShowcase />

      {/* ===== Brand Marquee ===== */}
      {(() => {
        const BRAND_LOGOS = [
          { src: "/images/brands/audi.svg",        alt: "Audi" },
          { src: "/images/brands/bmw.svg",         alt: "BMW" },
          { src: "/images/brands/mercedes.svg",    alt: "Mercedes-Benz" },
          { src: "/images/brands/volkswagen.svg",  alt: "Volkswagen" },
          { src: "/images/brands/tesla.svg",       alt: "Tesla" },
          { src: "/images/brands/toyota.svg",      alt: "Toyota" },
          { src: "/images/brands/volvo.svg",       alt: "Volvo" },
          { src: "/images/brands/ford.svg",        alt: "Ford" },
          { src: "/images/brands/hyundai.svg",     alt: "Hyundai" },
          { src: "/images/brands/kia.svg",         alt: "Kia" },
        ];
        const items = [...BRAND_LOGOS, ...BRAND_LOGOS];
        return (
          <div className="overflow-hidden bg-white py-6">
            <div className="marquee-track flex min-w-max items-center">
              {items.map((logo, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex items-center justify-center px-5 sm:px-8">
                    <div className="relative h-7 w-[70px] shrink-0 sm:h-10 sm:w-[100px]">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 640px) 100px, 70px"
                        style={{ filter: "grayscale(1) opacity(0.4)" }}
                      />
                    </div>
                  </div>
                  <span className="text-ink/15 text-xs select-none">|</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ===== Waarom Telesto ===== */}
      <section id="over" className="overflow-hidden bg-white pb-16 lg:pb-20">
        <div className="grid items-center lg:grid-cols-[5fr_6fr] lg:min-h-[560px]">

          {/* Left: photo column */}
          <div className="over-image-col animate-on-scroll order-2 lg:order-1" data-delay="0s">
            {/* Mobile: original rounded style */}
            <div className="relative mx-6 mt-10 mb-0 overflow-hidden rounded-3xl shadow-lg lg:hidden">
              <Image
                src="/images/over-ons.jpg"
                alt="Telesto Motors, persoonlijk auto-advies"
                width={1024}
                height={648}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Desktop: centered rounded rectangle, badge pops out */}
            <div className="relative hidden lg:block lg:pr-10">
              <div className="relative h-[460px] w-full overflow-hidden rounded-r-3xl shadow-lg">
                <Image
                  src="/images/over-ons.jpg"
                  alt="Telesto Motors, persoonlijk auto-advies"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              {/* Badge pops out below photo corner */}
              <div className="absolute -bottom-5 right-6 rounded-2xl bg-bronze px-7 py-5 text-white shadow-xl">
                <p className="text-3xl font-semibold">15+</p>
                <p className="text-sm text-white/85">jaar ervaring</p>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="order-1 flex items-center px-8 py-14 lg:order-2 lg:py-16 lg:pl-16 xl:pl-20 lg:pr-12 xl:pr-16">
            <div>
              <h2 className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl" data-delay="0s">
                Onafhankelijk, en altijd aan jouw kant
              </h2>
              <p className="animate-on-scroll mt-5 text-lg text-ink/70" data-delay="0.15s">
                Sinds 2008 helpen wij particulieren en bedrijven aan de juiste auto.
                Omdat we onafhankelijk zijn, kiezen we nooit voor een merk: alleen
                voor jou. Met ruime kennis van elektrische en hybride auto&apos;s
                denken we mee over vandaag én morgen.
              </p>
              <ul className="animate-on-scroll mt-8 space-y-4" data-delay="0.28s">
                {[
                  "Volledig onafhankelijk, geen merkbinding",
                  "Specialist in elektrisch en hybride rijden",
                  "Persoonlijk contact, van eerste gesprek tot aflevering",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-bronze/15 text-bronze">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-ink/80">{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="btn-label animate-on-scroll mt-10 inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-bronze-dark"
                data-delay="0.4s"
              >
                Plan een kennismaking
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===== Social / Instagram ===== */}
      <SocialInstagram />

      {/* ===== Klantreviews ===== */}
      <ReviewsWall />

      {/* ===== Contact ===== */}
      <section id="contact" className="relative bg-cream py-24">
        {/* Lower half bg-ink so the form card lifts off the seam into the footer */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-[68%] bg-ink" />
        <div className="relative z-10 mx-auto max-w-container px-6">
          {/* Centered header */}
          <div className="mx-auto max-w-xl text-center">
            <h2 className="animate-on-scroll font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl" data-delay="0s">
              Laten we kennismaken
            </h2>
            <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65" data-delay="0.15s">
              Vertel ons jouw wensen in een paar stappen. Wij nemen binnen een werkdag contact op.
            </p>
          </div>

          {/* Form card centered below */}
          <div className="animate-on-scroll mt-12 w-full" data-delay="0.28s">
            <ContactTabs />
          </div>
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
              {DEFAULT_NAV.map((item) => (
                <li key={item.href}>
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
              Gemaakt door{" "}
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
  );
}
