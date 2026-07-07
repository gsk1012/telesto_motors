import type { Metadata } from 'next'
import StickyNav from '../components/StickyNav'
import ScrollAnimator from '../components/ScrollAnimator'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/10 pt-6">
      <h2 className="font-serif text-xl font-semibold text-ink mb-3">{title}</h2>
      <div className="text-sm leading-relaxed text-ink/70 space-y-2">{children}</div>
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-bronze" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description:
    'Lees het privacybeleid van Telesto Motors. Wij gaan zorgvuldig om met uw persoonsgegevens.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://telestomotors.nl/privacybeleid',
  },
}

const NAV = [
  { label: 'Home', href: '/#home' },
  { label: 'Over ons', href: '/#over' },
  { label: 'Diensten', href: '/diensten' },
  { label: 'Pakketten', href: '/plans' },
  { label: 'Contact', href: '/#contact' },
]

export default function PrivacybeleidPage() {
  return (
    <main className="bg-cream text-ink">
      <StickyNav links={NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Header ===== */}
      <section className="bg-ink pt-36 pb-12">
        <div className="mx-auto max-w-container px-6">
          <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
            Privacybeleid
          </h1>
          <p className="mt-3 text-sm text-white/45">Laatst bijgewerkt: juni 2025</p>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className="py-12">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-3xl space-y-6">

            <p className="text-sm leading-relaxed text-ink/65">
              Telesto Motors verwerkt persoonsgegevens zorgvuldig en in overeenstemming met
              de AVG. Dit beleid legt uit welke gegevens wij verzamelen en hoe wij daarmee omgaan.
            </p>

            <Block title="Reikwijdte en toestemming">
              <p>Door gebruik te maken van onze website gaat u akkoord met het verzamelen en bewaren van persoonsgegevens zoals hier beschreven.</p>
            </Block>

            <Block title="Wij verkopen uw gegevens niet">
              <p>Telesto Motors verkoopt uw gegevens nooit aan derden. Wij delen informatie uitsluitend met partijen die betrokken zijn bij onze dienstverlening.</p>
            </Block>

            <Block title="Welke gegevens verzamelen wij?">
              <p className="font-medium text-ink">Automatisch</p>
              <List items={[
                'Browsergegevens en apparaatinformatie',
                "Bezoekduur en bezochte pagina's",
                'Locatiegegevens afgeleid van uw IP-adres',
              ]} />
              <p className="font-medium text-ink pt-2">Door u verstrekt</p>
              <List items={[
                'Naam (voor persoonlijke communicatie)',
                'E-mailadres (voor bevestigingen en nieuwsbrieven, met toestemming)',
                'Telefoonnummer (voor contact rondom uw opdracht)',
                'Financiële gegevens (uitsluitend bij terugbetalingen)',
              ]} />
            </Block>

            <Block title="Waarvoor gebruiken wij uw gegevens?">
              <List items={[
                'Uitvoeren van onze dienstverlening',
                'Persoonlijke communicatie en opvolging',
                'Relevante updates en aanbiedingen (uitsluitend met uw toestemming)',
              ]} />
            </Block>

            <Block title="Delen met derden">
              <p>
                Verwerkers werken op beveiligde EU-servers onder verwerkersovereenkomst. Wij gebruiken Google Analytics voor websiteanalyse. Bezwaar via{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>.
                Gegevens worden alleen verstrekt als wettelijk verplicht.
              </p>
            </Block>

            <Block title="Bewaartermijn">
              <p>Wij bewaren gegevens niet langer dan noodzakelijk. Op verzoek verwijderen wij uw gegevens zo snel mogelijk.</p>
            </Block>

            <Block title="Beveiliging">
              <p>Wij treffen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies of misbruik.</p>
            </Block>

            <Block title="Externe links">
              <p>Telesto Motors is niet verantwoordelijk voor de privacypraktijken van externe websites waarnaar wij linken.</p>
            </Block>

            <Block title="Uw rechten">
              <List items={[
                'Inzage in uw persoonsgegevens',
                'Correctie van onjuiste gegevens',
                'Verwijdering van uw gegevens',
              ]} />
              <p className="pt-1">
                Verzoeken indienen via{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>.
                Wij reageren binnen vier weken.
              </p>
            </Block>

            <Block title="Klachten">
              <p>
                Klachten kunt u indienen via{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>.
                Bij een onbevredigend antwoord kunt u terecht bij de{' '}
                <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-bronze hover:underline">
                  Autoriteit Persoonsgegevens
                </a>.
              </p>
            </Block>

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
            <p className="text-sm font-semibold uppercase tracking-widest text-white">Menu</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
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
