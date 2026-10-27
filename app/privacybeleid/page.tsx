import type { Metadata } from 'next'
import StickyNav from '../components/StickyNav'
import ScrollAnimator from '../components/ScrollAnimator'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/10 pt-6">
      <h2 className="font-serif text-xl font-light text-ink mb-3">{title}</h2>
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
    'Welke persoonsgegevens Telesto Motors verwerkt, waarvoor, met wie wij ze delen, hoe lang wij ze bewaren en welke rechten u heeft.',
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
  { label: 'Pakketten', href: '/pakketten' },
  { label: 'Contact', href: '/#contact' },
]

export default function PrivacybeleidPage() {
  return (
    <main className="bg-cream text-ink">
      <StickyNav links={NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Header ===== */}
      <section className="bg-ink pt-36 pb-12">
        <div className="mx-auto max-w-container px-6">
          <h1 className="font-serif text-4xl font-light text-white sm:text-5xl">
            Privacybeleid
          </h1>
          <p className="mt-3 text-sm text-white/45">Laatst bijgewerkt: oktober 2026</p>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className="py-12">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm leading-relaxed text-ink/65">
              Telesto Motors verwerkt persoonsgegevens conform de AVG. Hieronder leest u welke
              gegevens wij verwerken en welke rechten u heeft.
            </p>

            <Block title="Wie zijn wij?">
              <p>
                Telesto Motors is verantwoordelijk voor de verwerking van uw gegevens. Contact:{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a> of{' '}
                <a href="tel:+31620779977" className="text-bronze hover:underline">+31 (0)6 20 77 99 77</a>.
              </p>
            </Block>

            <Block title="Welke gegevens en waarvoor?">
              <p>
                Wij verwerken de gegevens die u zelf invult in het contactformulier of de agenda (naam,
                e-mailadres, telefoonnummer, uw wensen en bericht), en technische gegevens zoals uw
                IP-adres. Wij gebruiken ze om uw vraag te beantwoorden, een afspraak te plannen, onze
                dienst uit te voeren en de website te beveiligen. Grondslagen: uitvoering van een
                overeenkomst of uw verzoek, ons gerechtvaardigd belang en een wettelijke verplichting.
                Voor analytische cookies en externe diensten vragen wij uw toestemming, zie ons{' '}
                <a href="/cookiebeleid" className="text-bronze hover:underline">cookiebeleid</a>.
              </p>
              <p>
                Wij gebruiken uw gegevens niet voor reclame en nemen geen besluiten die uitsluitend op
                geautomatiseerde verwerking berusten.
              </p>
            </Block>

            <Block title="Met wie delen wij uw gegevens?">
              <p>
                Wij verkopen uw gegevens nooit. Wij delen gegevens met partijen die ons helpen bij onze
                dienstverlening, zoals onze e-mailprovider, hostingpartij, afsprakentool en
                betrouwbare aanbieders voor het verzenden van formulieren, met afspraken over de
                bescherming van uw gegevens. Verwerking buiten de EER gebeurt met passende waarborgen.
                Verder verstrekken wij gegevens alleen als de wet dat verplicht.
              </p>
            </Block>

            <Block title="Bewaartermijn">
              <p>
                Wij bewaren gegevens niet langer dan nodig, in de regel maximaal twaalf maanden na het
                laatste contact, tenzij de wet een langere bewaartermijn voorschrijft.
              </p>
            </Block>

            <Block title="Uw rechten">
              <p>
                U heeft recht op inzage, correctie, verwijdering, beperking, bezwaar en overdracht van
                uw gegevens, en u kunt gegeven toestemming altijd intrekken. Dien een verzoek in via
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>; wij reageren binnen één maand. Een klacht kunt u indienen bij de{' '}
                <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-bronze hover:underline">
                  Autoriteit Persoonsgegevens
                </a>.
              </p>
            </Block>

          </div>
        </div>
      </section>

      <ScrollAnimator />
    </main>
  )
}
