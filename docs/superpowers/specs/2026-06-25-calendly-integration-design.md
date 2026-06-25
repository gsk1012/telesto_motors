# Calendly Integration — Design Spec

**Date:** 2026-06-25
**Status:** Approved

## Goal

Integrate Calendly inline naast het bestaande contactformulier in de `#contact` sectie van de Telesto Motors website. Gebruikers kunnen kiezen tussen direct een afspraak plannen of een bericht sturen.

## Calendly account

- **Account:** BlueStar Development (test — klant vervangt dit later met eigen URL)
- **Event type:** Intake gesprek – Telesto Motors (60 min)
- **Booking URL:** `https://calendly.com/bluestardevelopment-info/intake-gesprek-telesto-motors`
- **Later aanpassen:** één constante in `CalendlyWidget.tsx`

## Layout

De `#contact` sectie behoudt dezelfde heading. Daaronder twee tabs:

```
[ Plan een afspraak ]  [ Stuur een bericht ]
────────────────────────────────────────────
  Calendly inline embed     ContactForm
  (standaard actief)        (al bestaand)
```

- **Standaard actieve tab:** "Plan een afspraak" (Calendly)
- Bestaande CTA-knoppen (`href="#contact"`) hoeven niet te wijzigen

## Componenten

### `app/components/CalendlyWidget.tsx`
- Client component
- Rendert een `<iframe>` naar de Calendly booking URL
- Props: geen (URL is een interne constante — makkelijk te swappen)
- Stijl: vaste hoogte (~700px), breedte 100%, geen border, passend bij cream/white achtergrond
- Query params: `?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=C08B5C`

### `app/components/ContactTabs.tsx`
- Client component (`"use client"`)
- Beheert `activeTab` state (`"afspraak" | "bericht"`)
- Rendert tab-balk + conditioneel `<CalendlyWidget />` of `<ContactForm />`
- Tab-stijl: passend bij bestaande button/border stijlen (bronze accent voor actieve tab)

### `app/page.tsx` (wijziging)
- In de `#contact` sectie: vervang `<ContactForm />` door `<ContactTabs />`
- Heading en beschrijving blijven ongewijzigd

## Technische keuzes

| Keuze | Reden |
|---|---|
| iframe embed (geen script) | Geen externe script-loading nodig in Next.js, simpel en betrouwbaar |
| Standaard Calendly tab actief | Beide bestaande CTA-knoppen werken direct correct |
| URL als constante in component | Klant kan eigen Calendly URL later eenvoudig inzetten |

## Wat verandert er niet

- Hero CTA ("Afspraak maken") — href blijft `#contact`
- "Plan een kennismaking" knop — href blijft `#contact`
- ContactForm component zelf — ongewijzigd
- Alle andere secties — ongewijzigd
