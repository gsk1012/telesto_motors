/*
 * De drie pakketten. Gedeeld door /pakketten (volledige vergelijking) en de
 * dienstpagina's op /diensten/[slug] (in welk pakket zit deze dienst).
 */

export type PackageTier = 'Elite' | 'Deluxe' | 'Excellent'

export interface Plan {
  tier: PackageTier
  name: string
  scope: string
  description: string
  featured: boolean
  features: { label: string; included: boolean }[]
}

export const PLANS: Plan[] = [
  {
    tier: 'Elite',
    name: 'Telesto Elite',
    scope: 'Gericht advies',
    description:
      'Een gerichte start in je auto-zoektocht. Wij geven je een helder beeld van de beste opties die aansluiten bij jouw wensen en budget.',
    featured: false,
    features: [
      { label: 'Onafhankelijk auto-advies', included: true },
      { label: 'Autosearch', included: true },
      { label: 'Selectie op wensen', included: true },
      { label: 'Screening & onderhandeling', included: false },
      { label: 'Technische keuring', included: false },
      { label: 'Inruiladvies', included: false },
    ],
  },
  {
    tier: 'Deluxe',
    name: 'Telesto Deluxe',
    scope: 'Advies & onderhandeling',
    description:
      'Wij staan voor je klaar om de beste deal te maken. Betaal nooit te veel voor jouw droomauto.',
    featured: true,
    features: [
      { label: 'Onafhankelijk auto-advies', included: true },
      { label: 'Autosearch', included: true },
      { label: 'Selectie op wensen', included: true },
      { label: 'Screening & onderhandeling', included: true },
      { label: 'Technische keuring', included: false },
      { label: 'Inruiladvies', included: false },
    ],
  },
  {
    tier: 'Excellent',
    name: 'Telesto Excellent',
    scope: 'Volledig ontzorgd',
    description:
      'Volledig ontzorgd van A tot Z. Vertel ons jouw wensen en wij regelen alles rondom jouw auto-aankoop.',
    featured: false,
    features: [
      { label: 'Onafhankelijk auto-advies', included: true },
      { label: 'Autosearch', included: true },
      { label: 'Selectie op wensen', included: true },
      { label: 'Screening & onderhandeling', included: true },
      { label: 'Technische keuring', included: true },
      { label: 'Inruiladvies', included: true },
    ],
  },
]
