import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "./diensten/services";
import ContactTabs from "./components/ContactTabs";
import StickyNav from "./components/StickyNav";
import ScrollAnimator from "./components/ScrollAnimator";
import SocialInstagram from "./components/SocialInstagram";
import ReviewsSpotlight from "./components/ReviewsSpotlight";
import PromiseShowcase from "./components/PromiseShowcase";
import HeroSlider from "./components/HeroSlider";
import BrandsMarquee from "./components/BrandsMarquee";
import SplitHeading from "./components/SplitHeading";

export default function Home() {
  return (
    <main id="home" className="bg-cream text-ink">
      {/* ===== Navbar ===== */}
      <StickyNav />

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[62svh] w-full items-center overflow-hidden md:min-h-[88svh] md:items-start">
        <HeroSlider />
        {/* scrims — licht gehouden zodat de hero helder blijft, net genoeg voor leesbare tekst */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-container px-6 pt-16 md:pt-32 lg:pt-40">
          <div className="max-w-3xl">
            <SplitHeading
              as="h1"
              lines={['De plek waar jouw', 'droomauto werkelijkheid wordt']}
              className="font-sans text-4xl/[1.3] font-light uppercase tracking-[0.04em] text-white sm:text-5xl/[1.3] lg:text-6xl/[1.3]"
            />

            <div className="animate-fade-up mt-8" style={{ animationDelay: '0.2s' }}>
              <Link
                href="#diensten"
                className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide"
              >
                Bekijk onze diensten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Merken-marquee ===== */}
      <BrandsMarquee />

      {/* ===== Diensten ===== */}
      <section
        id="diensten"
        className="pt-16 pb-24"
        style={{ backgroundColor: '#191D23' }}
      >
        <div className="mx-auto max-w-container px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                Onze diensten
              </p>
              <SplitHeading
                lines={['Van zoektocht tot sleutels']}
                className="mt-3 font-serif text-4xl font-light uppercase leading-tight text-white sm:text-5xl lg:whitespace-nowrap"
              />
              <p className="animate-on-scroll mt-5 text-lg leading-relaxed text-white/65" data-delay="0.15s">
                Een auto kopen is een van de grootste aankopen die je doet.
                Wij begeleiden je van het eerste gesprek tot de overhandeling
                van de sleutels. Onafhankelijk, grondig en altijd met jouw
                belang voorop.
              </p>
            </div>
            <div className="animate-on-scroll flex-none" data-delay="0.25s">
              <Link
                href="/diensten"
                className="btn-gold btn-label group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
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
                className="animate-on-scroll group flex flex-col overflow-hidden bg-[#20242B] ring-1 ring-white/10 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-cream hover:shadow-xl hover:shadow-black/20"
                data-delay={`${0.1 + i * 0.12}s`}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <SplitHeading
                    as="h3"
                    lines={[d.title]}
                    className="text-xl font-medium text-white transition-colors duration-500 ease-out group-hover:text-ink"
                  />
                  <p className="mt-3 leading-relaxed text-white/65 transition-colors duration-500 ease-out group-hover:text-ink/65">{d.shortBody}</p>
                  <span className="btn-label mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-bronze transition-colors duration-300 ease-out group-hover:text-bronze-dark">
                    Lees meer
                    <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Onze belofte (kenmerken) ===== */}
      <PromiseShowcase />

      {/* ===== Kenmerken-balk (credentials) ===== */}
      <section className="bg-cream">
        <div className="mx-auto max-w-container px-6 py-11 sm:py-12">
          <ul className="animate-on-scroll grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4 lg:flex-nowrap lg:justify-between lg:gap-x-6" data-delay="0s">
            {[
              "Expertise sinds 2008",
              "Vakkundig advies",
              "Persoonlijke aandacht",
              "5+ jaar ervaring in EV's en hybrides",
              "Specialisme",
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

      {/* ===== Waarom Telesto ===== */}
      <section id="over" className="overflow-hidden bg-cream text-ink">
        <div className="grid items-stretch lg:grid-cols-[1fr_1fr]">

          {/* Left: label boven, full-bleed foto eronder (crème erboven) */}
          <div className="order-2 flex flex-col lg:order-1">
            {/* Label alleen op desktop hier (linksboven het beeld) */}
            <p
              className="animate-on-scroll hidden text-center text-lg font-semibold uppercase tracking-widest text-bronze lg:block lg:pl-16 lg:pr-10 lg:pt-16 lg:pb-10 xl:pl-20"
              data-delay="0s"
            >
              Over ons
            </p>
            <div className="relative min-h-[300px] w-full flex-1 lg:min-h-[440px]">
              <Image
                src="/images/over-ons-home.jpg"
                alt="Telesto Motors, persoonlijk auto-advies"
                fill
                className="object-cover object-[50%_center]"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </div>

          {/* Right: titel bovenin, tekst eronder (zoals de referentie) */}
          <div className="relative z-10 order-1 flex flex-col justify-between gap-10 px-8 py-14 lg:order-2 lg:py-16 lg:pl-14 xl:pl-20 lg:pr-14 xl:pr-20">
            <div>
              {/* Label alleen op mobiel hier (boven de koptekst) */}
              <p className="animate-on-scroll mb-4 text-lg font-semibold uppercase tracking-widest text-bronze lg:hidden" data-delay="0s">
                Over ons
              </p>
              <SplitHeading
                lines={['Onafhankelijk advies', 'altijd zonder', 'eigenbelang.']}
                className="font-serif text-4xl font-light uppercase leading-[1.4] tracking-[0.12em] text-ink sm:text-5xl lg:max-w-[48rem] lg:text-[4rem] lg:leading-[1.35]"
              />
            </div>
            <div>
              <p className="animate-on-scroll text-lg leading-relaxed text-ink/65" data-delay="0.15s">
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
                className="btn-gold btn-label animate-on-scroll mt-10 inline-flex w-fit items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold"
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
      <ReviewsSpotlight />

      {/* ===== Contact ===== */}
      <section id="contact" className="relative bg-cream pt-24 pb-20">
        <div className="relative z-10 mx-auto max-w-container px-6">
          {/* Centered header */}
          <div className="mx-auto max-w-xl text-center">
            <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
              Contact
            </p>
            <SplitHeading
              lines={['Laten we kennismaken']}
              className="mt-3 font-serif text-4xl font-light uppercase leading-tight sm:text-5xl"
            />
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
    </main>
  );
}
