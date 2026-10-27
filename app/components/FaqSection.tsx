import FaqAccordion, { type FaqItem } from './FaqAccordion'
import SplitHeading from './SplitHeading'
import { FAQS } from '../lib/faqs'

function PhoneIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  )
}

/* FAQ (dark, two-column: heading + call prompt left, accordion right). Shared by diensten, pakketten and contact. */
export default function FaqSection({
  blurb,
  light = false,
  items = FAQS,
}: {
  blurb: string
  light?: boolean
  items?: FaqItem[]
}) {
  return (
    <section className={`py-20 sm:py-28 ${light ? 'bg-cream text-ink' : 'bg-[#14181E]'}`}>
          <div className="mx-auto max-w-container px-6">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* Left: heading + contact nudge */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="animate-on-scroll text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                  Veelgestelde vragen
                </p>
                <SplitHeading
                  lines={['We helpen je graag verder']}
                  className={`mt-3 font-serif text-4xl/[1.3] font-light sm:text-5xl/[1.3] ${light ? 'text-ink' : 'text-white'}`}
                />
                <p className={`animate-on-scroll mt-5 max-w-sm leading-relaxed ${light ? 'text-ink/65' : 'text-white/60'}`} data-delay="0.1s">
                  Staat je vraag er niet tussen? Bel ons gerust, dan denken we vrijblijvend met je mee
                  over {blurb}
                </p>
                <div className="animate-on-scroll mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6" data-delay="0.18s">
                  <a
                    href="/contact#formulier"
                    className="btn-gold btn-label inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold"
                  >
                    Plan een kennismaking
                  </a>
                  <a
                    href="tel:+31620779977"
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${light ? 'text-ink/80 hover:text-ink' : 'text-white/85 hover:text-white'}`}
                  >
                    <PhoneIcon className="h-4 w-4" />
                    +31 (0)6 20 77 99 77
                  </a>
                </div>
              </div>
  
              {/* Right: accordion */}
              <div>
                <p className="animate-on-scroll mb-4 text-lg font-semibold uppercase tracking-widest text-bronze" data-delay="0s">
                  FAQ
                </p>
                <FaqAccordion items={items} variant={light ? 'light' : 'dark'} />
              </div>
            </div>
          </div>
        </section>
  )
}
