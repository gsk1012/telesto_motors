import Image from "next/image";
import ContactForm from "./components/ContactForm";
import StickyNav from "./components/StickyNav";
import ScrollAnimator from "./components/ScrollAnimator";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Over Telesto", href: "#over" },
  { label: "Diensten", href: "#diensten" },
  { label: "Pakketen", href: "/plans" },
  { label: "Contact", href: "#contact" },
];

const DIENSTEN = [
  {
    title: "Persoonlijke autoselectie",
    body: "We zoeken objectief de auto die echt bij jouw leven, wensen en budget past. Onafhankelijk en zonder voorkeur voor een merk.",
    image: "/images/car-1.webp",
  },
  {
    title: "Technische keuring",
    body: "Elk voertuig wordt grondig gekeurd voor aankoop. Zo weet je precies wat je koopt en kom je nooit voor verrassingen te staan.",
    image: "/images/car-2.webp",
  },
  {
    title: "Prijsonderhandeling",
    body: "Wij onderhandelen namens jou de scherpste prijs en voorwaarden. Jij profiteert van onze kennis van de markt.",
    image: "/images/car-3.webp",
  },
];

export default function Home() {
  return (
    <main id="home" className="bg-cream text-ink">
      {/* ===== Navbar ===== */}
      <StickyNav />

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden md:items-center">
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
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '0.5s' }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-bronze-dark"
              >
                Afspraak maken
              </a>
              <a
                href="#diensten"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
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
        className="py-24"
        style={{ background: 'linear-gradient(to bottom, #F7F0EC 55%, #ffffff 55%)' }}
      >
        <div className="mx-auto max-w-container px-6">
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

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DIENSTEN.map((d, i) => (
              <article
                key={d.title}
                className="animate-on-scroll group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                <div className="p-7">
                  <h3 className="text-xl font-semibold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/65">{d.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Waarom Telesto ===== */}
      <section id="over" className="overflow-hidden bg-white">
        <div className="grid items-center lg:grid-cols-[5fr_6fr] lg:min-h-[720px]">

          {/* Left: photo column */}
          <div className="animate-on-scroll order-2 lg:order-1" data-delay="0s">
            {/* Mobile: original rounded style */}
            <div className="relative mx-6 mt-10 mb-2 overflow-hidden rounded-3xl shadow-lg lg:hidden">
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
          <div className="order-1 flex items-center px-8 py-16 lg:order-2 lg:py-24 lg:pl-16 xl:pl-20 lg:pr-12 xl:pr-16">
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
                className="animate-on-scroll mt-10 inline-flex items-center justify-center rounded-full bg-bronze px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-bronze-dark"
                data-delay="0.4s"
              >
                Plan een kennismaking
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="bg-cream py-24">
        <div className="mx-auto max-w-container px-6">
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
          <div className="animate-on-scroll mx-auto mt-12 max-w-2xl" data-delay="0.28s">
            <ContactForm />
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
              {NAV.map((item) => (
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
              <li>+31 (0)6 12 34 56 78</li>
              <li>Nederland</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              Openingstijden
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>Ma t/m vr: 09:00 - 18:00</li>
              <li>Za: op afspraak</li>
              <li>Zo: gesloten</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-container flex flex-col items-center gap-2 border-t border-white/10 px-6 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Telesto Motors</span>
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
      </footer>
    </main>
  );
}
