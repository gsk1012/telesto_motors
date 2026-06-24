'use client'

import { useState } from 'react'

type Step = 1 | 2 | 3 | 4 | 5

interface FormState {
  heeftVoorkeur: 'ja' | 'nee' | ''
  budget: string
  typeAuto: string[]
  brandstof: string
  naam: string
  email: string
  telefoon: string
  dagVoorkeur: string[]
  tijdVoorkeur: string
  bericht: string
}

const BUDGETS = [
  '€1.500 – €5.000',
  '€5.000 – €10.000',
  '€10.000 – €20.000',
  '€20.000 – €30.000',
  '€30.000 – €45.000',
  '€45.000 of meer',
]

const TYPES = ['SUV', 'Hatchback', 'Sedan', 'Stationwagon', 'Cabriolet', 'MPV', 'Sportwagen']

const BRANDSTOF = ['Benzine', 'Diesel', 'Elektrisch', 'Hybride', 'Geen voorkeur']

const DAGEN = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']

const TIJDEN = ['Ochtend', 'Middag', 'Avond']

function Pill({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ${
        selected
          ? 'border-bronze bg-bronze text-white shadow-sm'
          : 'border-ink/15 bg-white text-ink hover:border-bronze/50 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

const toggleMulti = (arr: string[], val: string): string[] =>
  arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]

const INITIAL: FormState = {
  heeftVoorkeur: '',
  budget: '',
  typeAuto: [],
  brandstof: '',
  naam: '',
  email: '',
  telefoon: '',
  dagVoorkeur: [],
  tijdVoorkeur: '',
  bericht: '',
}

export default function ContactForm() {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>(INITIAL)

  const fastTrack = form.heeftVoorkeur === 'ja'
  const totalSteps = fastTrack ? 2 : 5
  const displayStep = step === 5 && fastTrack ? 2 : step
  const progressPercent = (displayStep / totalSteps) * 100

  const isNextEnabled = () => {
    switch (step) {
      case 1: return form.heeftVoorkeur !== ''
      case 2: return form.budget !== ''
      case 3: return form.typeAuto.length > 0
      case 4: return form.brandstof !== ''
      case 5: return form.naam.trim() !== '' && form.email.trim() !== ''
      default: return false
    }
  }

  const handleNext = () => {
    if (step === 1 && fastTrack) setStep(5)
    else if (step < 5) setStep((s) => (s + 1) as Step)
  }

  const handleBack = () => {
    if (step === 5 && fastTrack) setStep(1)
    else if (step > 1) setStep((s) => (s - 1) as Step)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl bg-white p-10 shadow-sm text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bronze/10">
          <svg className="h-8 w-8 text-bronze" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-ink">
          Bedankt, {form.naam.split(' ')[0]}!
        </h3>
        <p className="mt-3 max-w-[22ch] text-base leading-relaxed text-ink/60">
          We nemen binnen een werkdag contact op. Tot snel!
        </p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setStep(1); setForm(INITIAL) }}
          className="mt-10 text-sm text-ink/40 underline-offset-2 transition-colors hover:text-ink/70"
        >
          Nieuw verzoek indienen
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Progress bar */}
      <div className="h-[3px] bg-ink/6">
        <div
          className="h-full bg-bronze transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
          Stap {displayStep} van {totalSteps}
        </p>

        <form onSubmit={handleSubmit}>
          {/* ── Step 1: weet je al wat je zoekt? ── */}
          {step === 1 && (
            <div>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">
                Weet je al wat je zoekt?
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    value: 'ja' as const,
                    label: 'Ja, ik weet al wat ik zoek',
                    sub: 'Ga direct naar het contactformulier',
                  },
                  {
                    value: 'nee' as const,
                    label: 'Nee, help mij kiezen',
                    sub: 'Doorloop een korte vragenlijst',
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, heeftVoorkeur: opt.value }))}
                    className={`rounded-xl border-2 p-5 text-left transition-all duration-150 ${
                      form.heeftVoorkeur === opt.value
                        ? 'border-bronze bg-bronze/5'
                        : 'border-ink/10 hover:border-bronze/35'
                    }`}
                  >
                    <p className="font-semibold text-ink">{opt.label}</p>
                    <p className="mt-1 text-sm text-ink/50">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: budget ── */}
          {step === 2 && (
            <div>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">
                Wat is je budget?
              </h3>
              <div className="mt-6 flex flex-col gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, budget: b }))}
                    className={`rounded-full border px-5 py-3 text-left text-sm font-medium transition-all duration-150 ${
                      form.budget === b
                        ? 'border-bronze bg-bronze text-white shadow-sm'
                        : 'border-ink/15 bg-white text-ink hover:border-bronze/50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: type auto ── */}
          {step === 3 && (
            <div>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">
                Welk type auto zoek je?
              </h3>
              <p className="mt-1 text-sm text-ink/45">Meerdere opties mogelijk</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {TYPES.map((t) => (
                  <Pill
                    key={t}
                    label={t}
                    selected={form.typeAuto.includes(t)}
                    onClick={() => setForm((f) => ({ ...f, typeAuto: toggleMulti(f.typeAuto, t) }))}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Step 4: brandstof ── */}
          {step === 4 && (
            <div>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">
                Welke brandstof heeft je voorkeur?
              </h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {BRANDSTOF.map((b) => (
                  <Pill
                    key={b}
                    label={b}
                    selected={form.brandstof === b}
                    onClick={() => setForm((f) => ({ ...f, brandstof: b }))}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Step 5: contactgegevens ── */}
          {step === 5 && (
            <div>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">
                Hoe kunnen we je bereiken?
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="naam" className="text-sm font-medium text-ink">
                    Naam <span className="text-bronze">*</span>
                  </label>
                  <input
                    id="naam"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.naam}
                    onChange={(e) => setForm((f) => ({ ...f, naam: e.target.value }))}
                    placeholder="Jan de Vries"
                    className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/45 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-ink">
                    E-mailadres <span className="text-bronze">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jan@voorbeeld.nl"
                    className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/45 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <label htmlFor="telefoon" className="text-sm font-medium text-ink">
                  Telefoonnummer{' '}
                  <span className="font-normal text-ink/40">(optioneel)</span>
                </label>
                <input
                  id="telefoon"
                  type="tel"
                  autoComplete="tel"
                  value={form.telefoon}
                  onChange={(e) => setForm((f) => ({ ...f, telefoon: e.target.value }))}
                  placeholder="+31 6 12 34 56 78"
                  className="rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/45 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
                />
              </div>
              <div className="mt-5">
                <p className="text-sm font-medium text-ink">
                  Voorkeur dag{' '}
                  <span className="font-normal text-ink/40">(optioneel)</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {DAGEN.map((d) => (
                    <Pill
                      key={d}
                      label={d}
                      selected={form.dagVoorkeur.includes(d)}
                      onClick={() => setForm((f) => ({ ...f, dagVoorkeur: toggleMulti(f.dagVoorkeur, d) }))}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-ink">
                  Voorkeur tijdstip{' '}
                  <span className="font-normal text-ink/40">(optioneel)</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {TIJDEN.map((t) => (
                    <Pill
                      key={t}
                      label={t}
                      selected={form.tijdVoorkeur === t}
                      onClick={() => setForm((f) => ({ ...f, tijdVoorkeur: t }))}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <label htmlFor="bericht" className="text-sm font-medium text-ink">
                  Aanvullende informatie{' '}
                  <span className="font-normal text-ink/40">(optioneel)</span>
                </label>
                <textarea
                  id="bericht"
                  rows={3}
                  value={form.bericht}
                  onChange={(e) => setForm((f) => ({ ...f, bericht: e.target.value }))}
                  placeholder="Eventuele wensen of vragen..."
                  className="resize-none rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/45 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-ink/45 transition-colors hover:text-ink/80"
              >
                Terug
              </button>
            ) : (
              <span />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isNextEnabled()}
                className="rounded-full bg-bronze px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Volgende
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isNextEnabled()}
                className="rounded-full bg-bronze px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verstuur aanvraag
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
