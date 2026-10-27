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
              Telesto Motors gebruikt cookies en vergelijkbare technieken. Hieronder leest u welke,
              waarvoor en hoe u uw keuze wijzigt. Meer over uw gegevens leest u in ons{' '}
              <a href="/privacybeleid" className="text-bronze hover:underline">privacybeleid</a>.
            </p>

            <Block title="Welke cookies gebruiken wij?">
              <List items={[
                'Noodzakelijk: onthoudt uw cookiekeuze en laat de website werken. Hiervoor is geen toestemming nodig.',
                'Analytisch (Google Analytics): geanonimiseerde bezoekstatistieken. Alleen met uw toestemming. Bewaartermijn maximaal 2 jaar.',
                'Externe diensten (Calendly): nodig om de afspraakagenda te tonen. Calendly kan eigen cookies plaatsen. Alleen met uw toestemming.',
              ]} />
              <p className="pt-1">Wij plaatsen geen marketing- of trackingcookies.</p>
            </Block>

            <Block title="Uw keuze wijzigen">
              <p>
                U kunt uw keuze op elk moment aanpassen of intrekken via het cookie-icoon linksonder
                op elke pagina. U kunt cookies ook verwijderen in uw browser.
              </p>
            </Block>

            <Block title="Vragen">
              <p>
                Vragen over dit beleid? Mail ons via{' '}
                <a href="mailto:info@telestomotors.nl" className="text-bronze hover:underline">info@telestomotors.nl</a>.
              </p>
            </Block>

          </div>
        </div>
      </section>

      <ScrollAnimator />
    </main>
  )
}
