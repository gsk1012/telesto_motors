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
              Telesto Motors verwerkt persoonsgegevens zorgvuldig en in overeenstemming met de
              Algemene verordening gegevensbescherming (AVG). In dit beleid leest u welke gegevens
              wij verwerken, waarvoor, met wie wij ze delen en welke rechten u heeft.
            </p>

            <Block title="Wie is verantwoordelijk?">
              <p>
                Telesto Motors is verantwoordelijk voor de verwerking van uw persoonsgegevens. Voor
                vragen over dit beleid of uw gegevens kunt u contact opnemen via{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a> of telefonisch via{' '}
                <a href="tel:+31620779977" className="text-bronze hover:underline">+31 (0)6 20 77 99 77</a>.
              </p>
            </Block>

            <Block title="Welke gegevens verwerken wij?">
              <p className="font-medium text-ink">Gegevens die u zelf verstrekt</p>
              <List items={[
                'Contactformulier: naam, e-mailadres, telefoonnummer (optioneel) en uw antwoorden over uw zoekvraag, zoals budget, type auto, brandstof, gewenst pakket, voorkeursdagen en uw bericht.',
                'Afspraak via de agenda: naam, e-mailadres en het gekozen tijdstip.',
                'Contact via e-mail, telefoon of chat: de gegevens die u in uw bericht of gesprek deelt, en uw telefoonnummer.',
              ]} />
              <p className="font-medium text-ink pt-2">Gegevens die automatisch worden verzameld</p>
              <List items={[
                'Technische gegevens zoals uw IP-adres, browsertype en de bezochte pagina\u2019s. Deze komen in de logbestanden van onze hostingpartij terecht en dienen voor beveiliging en storingen.',
                'Alleen met uw toestemming: geanonimiseerde bezoekstatistieken via een analysedienst (zie ons cookiebeleid).',
              ]} />
              <p className="pt-1">
                Wij vragen niet om gevoelige persoonsgegevens en verwerken die niet. Wij verwerken
                geen gegevens van kinderen onder de 16 jaar.
              </p>
            </Block>

            <Block title="Waarvoor gebruiken wij uw gegevens?">
              <List items={[
                'Uw vraag of aanvraag beantwoorden en een kennismaking of afspraak plannen. Grondslag: het nemen van maatregelen op uw verzoek voordat een overeenkomst wordt gesloten.',
                'Onze dienstverlening uitvoeren en met u communiceren over uw opdracht. Grondslag: uitvoering van de overeenkomst.',
                'De website beveiligen en storingen oplossen. Grondslag: gerechtvaardigd belang.',
                'Het gebruik van de website meten om die te verbeteren. Grondslag: uw toestemming.',
                'Voldoen aan wettelijke verplichtingen, zoals de administratie. Grondslag: wettelijke verplichting.',
              ]} />
              <p className="pt-1">
                Wij gebruiken uw gegevens niet voor nieuwsbrieven of reclame, tenzij u daar apart
                toestemming voor geeft. Er is geen sprake van geautomatiseerde besluitvorming of
                profilering.
              </p>
            </Block>

            <Block title="Met wie delen wij uw gegevens?">
              <p>
                Wij verkopen uw gegevens nooit. Wij delen gegevens met partijen die ons helpen bij onze
                dienstverlening, zoals onze e-mailprovider, hostingpartij, afsprakentool en
                betrouwbare aanbieders voor het verzenden van formulieren. Met deze partijen maken wij
                afspraken over de bescherming van uw gegevens. Sommigen verwerken gegevens ook buiten de
                Europese Economische Ruimte; dan zorgen zij voor passende waarborgen, zoals
                standaardcontractbepalingen. Verder verstrekken wij gegevens alleen aan derden als de
                wet dat verplicht.
              </p>
            </Block>

            <Block title="Cookies">
              <p>
                Wij gebruiken alleen noodzakelijke cookies, tenzij u toestemming geeft voor analytische
                cookies of externe diensten (de afspraakagenda). Welke cookies dat zijn en hoe u uw
                keuze wijzigt, leest u in ons{' '}
                <a href="/cookiebeleid" className="text-bronze hover:underline">cookiebeleid</a>.
              </p>
            </Block>

            <Block title="Hoe lang bewaren wij uw gegevens?">
              <p>
                Wij bewaren gegevens niet langer dan nodig is voor het doel waarvoor ze zijn verzameld.
                Een aanvraag of bericht bewaren wij in de regel tot maximaal twaalf maanden na het
                laatste contact. Gegevens die wij op grond van de wet moeten bewaren, zoals onze
                administratie, bewaren wij zo lang als de wet voorschrijft. Daarna verwijderen wij ze.
              </p>
            </Block>

            <Block title="Beveiliging">
              <p>
                Wij nemen passende technische en organisatorische maatregelen om uw gegevens te
                beschermen tegen verlies en misbruik. De website is beveiligd met een versleutelde
                verbinding (HTTPS) en alleen medewerkers die dat nodig hebben, hebben toegang tot uw
                gegevens. Vermoedt u misbruik? Neem dan direct contact met ons op.
              </p>
            </Block>

            <Block title="Externe links">
              <p>
                Onze website bevat links naar andere websites, zoals sociale media en berichtendiensten.
                Telesto Motors is niet verantwoordelijk voor hun privacypraktijken. Lees hun
                privacybeleid.
              </p>
            </Block>

            <Block title="Uw rechten">
              <List items={[
                'Inzage in de gegevens die wij van u verwerken.',
                'Correctie van onjuiste gegevens.',
                'Verwijdering van uw gegevens.',
                'Beperking van de verwerking en bezwaar tegen de verwerking.',
                'Overdracht van uw gegevens (dataportabiliteit).',
                'Intrekking van uw toestemming, op elk moment. Dat heeft geen gevolgen voor de verwerking daarvoor.',
              ]} />
              <p className="pt-1">
                U kunt een verzoek indienen via <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>. Wij reageren binnen één maand. Om misbruik te
                voorkomen kunnen wij u vragen zich te legitimeren.
              </p>
            </Block>

            <Block title="Klachten">
              <p>
                Bent u niet tevreden over hoe wij met uw gegevens omgaan? Neem dan contact met ons op
                via <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>. U heeft daarnaast het recht een klacht in te dienen bij de{' '}
                <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-bronze hover:underline">
                  Autoriteit Persoonsgegevens
                </a>.
              </p>
            </Block>

            <Block title="Wijzigingen">
              <p>
                Wij kunnen dit beleid aanpassen, bijvoorbeeld als onze dienstverlening of de wet
                verandert. De meest recente versie staat altijd op deze pagina, met de datum van de
                laatste wijziging bovenaan.
              </p>
            </Block>

          </div>
        </div>
      </section>

      <ScrollAnimator />
    </main>
  )
}
