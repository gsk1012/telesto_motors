// Beeldmerken (rond/vierkant) mogen hoger; woordmerken lager omdat ze optisch zwaarder ogen.
// Bewust afgewisseld: rond embleem → breed/woordmerk → rond embleem … zodat er
// nooit een kluitje ronde of een kluitje brede logo's achter elkaar staat
// (ook netjes over het naadloze loop-punt heen).
const BRAND_LOGOS = [
  { src: '/images/brands/porsche.svg', alt: 'Porsche', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/audi.svg', alt: 'Audi', cls: 'h-5 sm:h-6' },
  { src: '/images/brands/ferrari.svg', alt: 'Ferrari', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/bentley.svg', alt: 'Bentley', cls: 'h-9 sm:h-11' },
  { src: '/images/brands/bmw-mono.svg', alt: 'BMW', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/tesla.svg', alt: 'Tesla', cls: 'h-7 sm:h-9' },
  { src: '/images/brands/toyota.svg', alt: 'Toyota', cls: 'h-4 sm:h-5' },
  { src: '/images/brands/lamborghini.svg', alt: 'Lamborghini', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/mclaren.svg', alt: 'McLaren', cls: 'h-9 sm:h-11' },
  { src: '/images/brands/mercedes.webp', alt: 'Mercedes-Benz', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/volvo.svg', alt: 'Volvo', cls: 'h-4 sm:h-5' },
  { src: '/images/brands/maserati.svg', alt: 'Maserati', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/ford-mono.svg', alt: 'Ford', cls: 'h-5 sm:h-6' },
  { src: '/images/brands/rollsroyce.svg', alt: 'Rolls-Royce', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/volkswagen.svg', alt: 'Volkswagen', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/astonmartin.svg', alt: 'Aston Martin', cls: 'h-9 sm:h-11' },
  { src: '/images/brands/jaguar.svg', alt: 'Jaguar', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/hyundai.svg', alt: 'Hyundai', cls: 'h-4 sm:h-5' },
  { src: '/images/brands/alfaromeo.svg', alt: 'Alfa Romeo', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/landrover.svg', alt: 'Land Rover', cls: 'h-9 sm:h-11' },
  { src: '/images/brands/bugatti.svg', alt: 'Bugatti', cls: 'h-8 sm:h-10' },
  { src: '/images/brands/kia.svg', alt: 'Kia', cls: 'h-5 sm:h-6' },
]

export default function BrandsMarquee() {
  // Dubbele set voor een naadloze, oneindig lopende marquee.
  const brands = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <section className="overflow-hidden bg-[#191D23] pt-16 pb-6">
      <div className="marquee-track flex min-w-max items-center">
        {brands.map((logo, i) => (
          <div key={i} className="flex items-center justify-center px-10 sm:px-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className={`${logo.cls} w-auto shrink-0`}
              style={{ filter: 'brightness(0) invert(0.72) opacity(0.6)' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
