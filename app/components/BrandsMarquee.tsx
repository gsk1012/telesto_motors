// Beeldmerken (rond/vierkant) mogen hoger; woordmerken lager omdat ze optisch zwaarder ogen.
// Bewust afgewisseld: rond embleem → breed/woordmerk → rond embleem … zodat er
// nooit een kluitje ronde of een kluitje brede logo's achter elkaar staat
// (ook netjes over het naadloze loop-punt heen).
//
// `w`/`h` zijn de intrinsieke afmetingen uit de viewBox van het bestand. Ze
// bepalen niets aan de weergave (die komt uit `cls` + w-auto), maar geven de
// browser de verhouding vóórdat het logo binnen is — zonder dat verspringt de
// marquee terwijl de lazy-geladen logo's één voor één aankomen.
const BRAND_LOGOS = [
  { src: '/images/brands/audi.svg', alt: 'Audi', cls: 'h-5 sm:h-6', w: 265, h: 93 },
  { src: '/images/brands/opel.svg', alt: 'Opel', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/bmw-mono.svg', alt: 'BMW', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/peugeot.svg', alt: 'Peugeot', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/tesla.svg', alt: 'Tesla', cls: 'h-7 sm:h-9', w: 255, h: 254 },
  { src: '/images/brands/toyota.svg', alt: 'Toyota', cls: 'h-4 sm:h-5', w: 251, h: 42 },
  { src: '/images/brands/renault.svg', alt: 'Renault', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/mercedes.webp', alt: 'Mercedes-Benz', cls: 'h-8 sm:h-10', w: 128, h: 128 },
  { src: '/images/brands/volvo.svg', alt: 'Volvo', cls: 'h-4 sm:h-5', w: 800, h: 110 },
  { src: '/images/brands/citroen.svg', alt: 'Citroën', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/ford-mono.svg', alt: 'Ford', cls: 'h-5 sm:h-6', w: 24, h: 9 },
  { src: '/images/brands/skoda.svg', alt: 'Škoda', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/volkswagen.svg', alt: 'Volkswagen', cls: 'h-8 sm:h-10', w: 1024, h: 1024 },
  { src: '/images/brands/seat.svg', alt: 'Seat', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/jaguar.svg', alt: 'Jaguar', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/nissan.svg', alt: 'Nissan', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/hyundai.svg', alt: 'Hyundai', cls: 'h-4 sm:h-5', w: 1000, h: 129 },
  { src: '/images/brands/mazda.svg', alt: 'Mazda', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/alfaromeo.svg', alt: 'Alfa Romeo', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/honda.svg', alt: 'Honda', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/landrover.svg', alt: 'Land Rover', cls: 'h-9 sm:h-11', w: 24, h: 24 },
  { src: '/images/brands/fiat.svg', alt: 'Fiat', cls: 'h-8 sm:h-10', w: 24, h: 24 },
  { src: '/images/brands/kia.svg', alt: 'Kia', cls: 'h-5 sm:h-6', w: 1000, h: 502 },
  { src: '/images/brands/mini.svg', alt: 'Mini', cls: 'h-8 sm:h-10', w: 24, h: 24 },
]

export default function BrandsMarquee() {
  // Dubbele set voor een naadloze, oneindig lopende marquee.
  const brands = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <section className="overflow-hidden bg-[#191D23] pt-9 pb-6">
      <div className="marquee-track flex min-w-max items-center">
        {brands.map((logo, i) => {
          // De tweede set is puur de naadloze herhaling van de eerste: niet
          // aankondigen aan screenreaders.
          const clone = i >= BRAND_LOGOS.length
          return (
            <div key={i} className="flex items-center justify-center px-10 sm:px-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={clone ? '' : logo.alt}
                aria-hidden={clone || undefined}
                width={logo.w}
                height={logo.h}
                // Lazy + async decode: 24 losse logo's mogen niet met de
                // hero-afbeelding (de LCP) om bandbreedte concurreren.
                loading="lazy"
                decoding="async"
                className={`${logo.cls} w-auto shrink-0`}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
