/*
 * Placeholder customer reviews. Replace the copy, names and roles with real
 * testimonials when available; keep each quote to ~3 lines so the cards stay
 * balanced. The layout shows all four at once in a woven, staggered wall.
 */
const REVIEWS = [
  {
    quote:
      "Binnen twee weken hadden ze de juiste auto gevonden. De keuring legde verborgen schade bloot die mij duizenden euro's scheelde.",
    name: "Mark Verhoeven",
    role: "BMW 3-serie",
    initials: "MV",
    tone: "cream" as const,
  },
  {
    quote:
      "Geen verkooppraatjes, alleen eerlijk advies. De onderhandeling deden ze volledig voor mij, scherper dan ik zelf ooit had gekregen.",
    name: "Joost Brinkman",
    role: "Audi Q5, zakelijk",
    initials: "JB",
    tone: "white" as const,
  },
  {
    quote:
      "Ik wist niets van elektrisch rijden. Ze namen al mijn twijfels weg en kozen een model dat perfect bij mijn dagelijkse ritten past.",
    name: "Sanne de Wit",
    role: "Eerste elektrische auto",
    initials: "SW",
    tone: "white" as const,
  },
  {
    quote:
      "Persoonlijk en betrokken van het eerste gesprek tot de sleutels. Het voelde alsof iemand echt aan mijn kant stond.",
    name: "Eline Kuipers",
    role: "Gezinsauto",
    initials: "EK",
    tone: "cream" as const,
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-bronze" aria-label="Beoordeling 5 van de 5 sterren">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  delay,
}: {
  review: (typeof REVIEWS)[number];
  delay: string;
}) {
  const cream = review.tone === "cream";
  return (
    <figure
      data-delay={delay}
      className={`animate-on-scroll group relative overflow-hidden rounded-3xl border p-8 shadow-[0_20px_50px_-32px_rgba(140,110,80,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_64px_-28px_rgba(140,110,80,0.6)] sm:p-9 ${
        cream ? "border-bronze/15 bg-cream" : "border-ink/10 bg-white"
      }`}
    >
      {/* Watermark quote mark */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="pointer-events-none absolute -top-2 right-5 h-20 w-20 text-bronze/10 transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24"
        aria-hidden
      >
        <path d="M9.6 7C6.4 7 4 9.6 4 13.1V19h6.6v-6.6H7.9c0-1.9 1-3 2.8-3.1V7zm9.9 0c-3.2 0-5.6 2.6-5.6 6.1V19H20.5v-6.6h-2.7c0-1.9 1-3 2.8-3.1V7z" />
      </svg>

      <blockquote className="relative mt-5 font-serif text-lg font-medium leading-relaxed text-ink sm:text-xl">
        {review.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-4">
        <span>
          <span className="block font-semibold text-ink">{review.name}</span>
          <span className="block text-sm text-ink/55">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsWall() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-container px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <h2
            className="animate-on-scroll font-serif text-4xl font-semibold leading-tight sm:text-5xl"
            data-delay="0s"
          >
            Wat onze klanten zeggen
          </h2>
          <p
            className="animate-on-scroll mt-5 text-lg leading-relaxed text-ink/65"
            data-delay="0.15s"
          >
            Ervaringen van mensen die wij hielpen aan de auto die echt bij hen past.
          </p>
        </div>

        {/* Woven, staggered wall: right column drops down on desktop */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <ReviewCard review={REVIEWS[0]} delay="0.05s" />
            <ReviewCard review={REVIEWS[1]} delay="0.2s" />
          </div>
          <div className="flex flex-col gap-6 lg:mt-12">
            <ReviewCard review={REVIEWS[2]} delay="0.12s" />
            <ReviewCard review={REVIEWS[3]} delay="0.28s" />
          </div>
        </div>
      </div>
    </section>
  );
}
