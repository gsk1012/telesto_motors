import { DEFAULT_NAV } from './nav'

// Beeldmerken (rond/vierkant) mogen hoger; woordmerken lager omdat ze optisch zwaarder ogen.
const BRAND_LOGOS = [
  { src: '/images/brands/audi.svg', alt: 'Audi', cls: 'h-5 sm:h-6' },
  { src: '/images/brands/bmw-mono.svg', alt: 'BMW', cls: 'h-6 sm:h-8' },
  { src: '/images/brands/mercedes.webp', alt: 'Mercedes-Benz', cls: 'h-6 sm:h-8' },
  { src: '/images/brands/volkswagen.svg', alt: 'Volkswagen', cls: 'h-6 sm:h-8' },
  { src: '/images/brands/tesla.svg', alt: 'Tesla', cls: 'h-6 sm:h-8' },
  { src: '/images/brands/toyota.svg', alt: 'Toyota', cls: 'h-3 sm:h-4' },
  { src: '/images/brands/volvo.svg', alt: 'Volvo', cls: 'h-3 sm:h-4' },
  { src: '/images/brands/ford-mono.svg', alt: 'Ford', cls: 'h-4 sm:h-5' },
  { src: '/images/brands/hyundai.svg', alt: 'Hyundai', cls: 'h-3 sm:h-4' },
  { src: '/images/brands/kia.svg', alt: 'Kia', cls: 'h-5 sm:h-6' },
]

export default function Footer() {
  // Dubbele set voor een naadloze, oneindig lopende marquee.
  const brands = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <footer className="-mt-px bg-footer pt-6 pb-16 text-white/80">
      {/* Merken-marquee */}
      <div className="overflow-hidden pt-10 pb-10 mb-10">
        <div className="marquee-track flex min-w-max items-center">
          {brands.map((logo, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center justify-center px-5 sm:px-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.cls} w-auto shrink-0`}
                  style={{ filter: 'brightness(0) invert(0.72) opacity(0.6)' }}
                />
              </div>
              <span className="text-xs text-white/10 select-none">|</span>
            </div>
          ))}
        </div>
      </div>

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
  )
}
