import type { Metadata } from 'next'
import StickyNav from '../components/StickyNav'
import ScrollAnimator from '../components/ScrollAnimator'

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description:
    'Welke cookies Telesto Motors gebruikt, waarvoor, hoe lang ze bewaard blijven en hoe je jouw keuze op elk moment wijzigt.',
  alternates: {
    canonical: 'https://telestomotors.nl/cookiebeleid',
  },
}

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

const COOKIES = [
  {
    category: 'Noodzakelijk',
    name: 'telesto-cookie-consent-v2',
    provider: 'Telesto Motors (eigen site)',
    purpose: 'Onthoudt jouw cookiekeuze. Wordt opgeslagen in de browser (localStorage), niet verstuurd naar een server.',
    retention: 'Tot je het wist',
  },
  {
    category: 'Analytisch',
    name: '_ga, _ga_*',
    provider: 'Google Analytics',
    purpose: "Telt geanonimiseerd hoeveel bezoekers er zijn en welke pagina's worden bekeken. Alleen met toestemming.",
    retention: 'Maximaal 2 jaar',
  },
  {
    category: 'Externe diensten',
    name: 'Diverse',
    provider: 'Calendly (en betaaldienst Stripe)',
    purpose: 'Nodig om de afspraakagenda te tonen en te laten werken, onder meer voor beveiliging en voorkeuren. Alleen met toestemming.',
    retention: 'Wordt bepaald door Calendly',
  },
]

const NAV = [
  { label: 'Home', href: '/#home' },
  { label: 'Over ons', href: '/#over' },
  { label: 'Diensten', href: '/diensten' },
  { label: 'Pakketten', href: '/pakketten' },
  { label: 'Contact', href: '/#contact' },
]

export default function CookiebeleidPage() {
  return (
    <main className="bg-cream text-ink">
      <StickyNav links={NAV} logoHref="/" ctaHref="/contact#formulier" />

      {/* ===== Header ===== */}
      <section className="bg-ink pt-36 pb-12">
        <div className="mx-auto max-w-container px-6">
          <h1 className="font-serif text-4xl font-light text-white sm:text-5xl">Cookiebeleid</h1>
          <p className="mt-3 text-sm text-white/45">Laatst bijgewerkt: oktober 2026</p>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className="py-12">
        <div className="mx-auto max-w-container px-6">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm leading-relaxed text-ink/65">
              Op deze pagina leggen wij uit welke cookies telestomotors.nl gebruikt, waarvoor en hoe
              lang. Je bepaalt zelf welke categorieën je toestaat. Hoe wij verder met persoonsgegevens
              omgaan, lees je in ons{' '}
              <a href="/privacybeleid" className="text-bronze hover:underline">privacybeleid</a>.
            </p>

            <Block title="Wat zijn cookies?">
              <p>
                Cookies zijn kleine bestanden die een website in je browser opslaat. Ze onthouden
                bijvoorbeeld een keuze, of laten zien hoe een website wordt gebruikt. Wij gebruiken
                ook vergelijkbare technieken, zoals opslag in de browser (localStorage).
              </p>
            </Block>

            <Block title="Welke categorieën gebruiken wij?">
              <List items={[
                'Noodzakelijk: nodig om de website te laten werken en jouw keuze te onthouden. Hiervoor is geen toestemming nodig. Er worden geen gegevens gevolgd.',
                'Analytisch: Google Analytics, waarmee wij geanonimiseerd zien welke pagina’s worden bezocht, zodat wij de website kunnen verbeteren. Alleen met jouw toestemming.',
                'Externe diensten: de afspraakagenda van Calendly. Die kan eigen cookies plaatsen. De agenda laadt pas nadat je toestemming hebt gegeven.',
              ]} />
              <p className="pt-1">
                Wij plaatsen geen marketing- of trackingcookies en tonen geen advertenties.
              </p>
            </Block>

            <Block title="Overzicht van de cookies">
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/15 text-ink">
                      <th className="px-1 py-2 font-semibold">Categorie</th>
                      <th className="px-1 py-2 font-semibold">Naam</th>
                      <th className="px-1 py-2 font-semibold">Partij</th>
                      <th className="px-1 py-2 font-semibold">Doel</th>
                      <th className="px-1 py-2 font-semibold">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((c) => (
                      <tr key={c.name} className="border-b border-ink/10 align-top">
                        <td className="px-1 py-3 font-medium text-ink">{c.category}</td>
                        <td className="px-1 py-3">{c.name}</td>
                        <td className="px-1 py-3">{c.provider}</td>
                        <td className="px-1 py-3">{c.purpose}</td>
                        <td className="px-1 py-3">{c.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="pt-2">
                Meer over de cookies van Calendly lees je in het{' '}
                <a
                  href="https://calendly.com/legal/cookie-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bronze hover:underline"
                >
                  cookiebeleid van Calendly
                </a>
                .
              </p>
            </Block>

            <Block title="Je keuze wijzigen of intrekken">
              <p>
                Je kunt je keuze op elk moment aanpassen via het cookie-icoon linksonder op elke pagina.
                Trek je toestemming voor
                analytische cookies in, dan worden de bijbehorende cookies verwijderd.
              </p>
              <p>
                Je kunt cookies ook zelf verwijderen of blokkeren in de instellingen van je browser.
                Dan kan het zijn dat onderdelen van de website, zoals de agenda, niet werken.
              </p>
            </Block>

            <Block title="Vragen of klachten">
              <p>
                Heb je een vraag over dit cookiebeleid? Mail ons via{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>.
                Klachten kun je ook indienen bij de{' '}
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
