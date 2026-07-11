# Reviews-spotlight — ontwerp

**Datum:** 2026-07-12
**Status:** Goedgekeurd, klaar voor implementatieplan

## Doel

De klantreviews op een mooiere, unieke manier presenteren. De huidige
`ReviewsWall` (4 statische citaat-kaarten in een geweven muur) wordt vervangen
door een **spotlight-carrousel**: één review tegelijk, groot uitgelicht, met een
foto van de auto die Telesto voor die klant vond.

Past bij de vastgelegde voorkeuren: beeldrijke, volle secties (geen leegte),
geen grote-getal-statistieken, geen zichtbare sectieranden.

## Plaatsing & scope

- Vervangt `app/components/ReviewsWall.tsx`. Bestand wordt hernoemd naar
  `app/components/ReviewsSpotlight.tsx` (client component, `"use client"`).
- De enige importregel in `app/page.tsx` (nu `import ReviewsWall from
  "./components/ReviewsWall"`, gebruikt op de reviews-plek tussen
  `<SocialInstagram />` en de contactsectie) wordt bijgewerkt naar de nieuwe
  naam. De sectiepositie en het donkere `bg-charcoal`-blok blijven ongewijzigd.
- Geen wijzigingen aan andere componenten.

## Kop-blok (ongewijzigd van toon)

- Eyebrow: "Klantervaringen" (bronze, uppercase, tracking-widest).
- h2: "Wat onze klanten zeggen" (serif, licht, uppercase, wit).
- Subtekst: bestaande regel behouden.
- Geen hairline/rand tussen deze en aangrenzende secties.

## Spotlight-paneel (één review tegelijk)

Split-kaart met dezelfde visuele taal als de huidige kaarten:
`rounded-3xl`, `bg-white/[0.06]`, `border border-white/10`, backdrop-blur,
zachte schaduw.

- **Links (~45% breedte, desktop):** grote autofoto, vult de kaarthoogte,
  afgeronde hoeken, `object-cover`.
- **Rechts (~55%):** in volgorde
  1. 5 bronzen sterren (hergebruik bestaande `Stars`-markup + aria-label).
  2. Groot serif-citaat (`font-serif`, ruime leading, wit).
  3. Klein bronzen accentlijntje.
  4. Naam (semibold wit) + rol/auto-model (`text-white/55`).
- **Vaste comfortabele min-hoogte** op de kaart zodat wisselende citaatlengtes
  de layout niet laten springen tijdens auto-rotatie.

## Navigatie — filmstrip van auto-thumbnails

- Onder het paneel: een rij kleine afgeronde autofoto's, één per review.
- Actieve thumbnail: bronzen rand + volle opacity; inactieve iets gedimd.
- Klik op thumbnail = spring naar die review.
- Daarnaast discrete vorige/volgende-knoppen (ronde `button`s, bronze bij hover).

## Beweging & interactie

- **Auto-rotatie** ~6,5s per review, met zachte crossfade (opacity + subtiele
  slide/scale). Implementatie: `useState` (actieve index) + `useEffect`
  interval met cleanup.
- **Pauzeert** bij hover én bij focus-within (autoplay stopt zolang de gebruiker
  interacteert).
- **Handmatig:** thumbnail-klik, vorige/volgende-pijlen, en swipe op touch
  (mobiel).
- **`prefers-reduced-motion`:** geen auto-rotatie en geen overgangsanimaties;
  wisselen gebeurt dan direct. Sluit aan op het bestaande animatiesysteem
  (`.animate-on-scroll` voor de kop mag blijven).

## Responsive gedrag

- **Desktop (`lg`):** beeld links, tekst rechts, side-by-side.
- **Mobiel:** beeld bovenop (≈4:3), tekst eronder; filmstrip wordt een
  horizontaal scrollbaar rijtje; swipe ingeschakeld.

## Toegankelijkheid

- Wrapper als carousel-regio: `role="region"` / `aria-roledescription="carousel"`,
  `aria-label="Klantreviews"`.
- Pijlen: echte `button`s met `aria-label` ("Vorige review" / "Volgende review").
- Thumbnails: `button`s met `aria-label` (naam + auto) en `aria-current` op de
  actieve.
- Autoplay stopt bij focus binnen de regio.
- Sterren behouden bestaande `aria-label="Beoordeling 5 van de 5 sterren"`.

## Data

- `REVIEWS`-array behoudt de 4 bestaande items (quote, name, role) en krijgt een
  extra veld `image` (pad naar de autofoto). Ongebruikte `initials` mogen weg.

## Assets

- 4 placeholder-autofoto's onder `public/images/reviews/` (Higgsfield-gegenereerd,
  consistent met de aanpak elders op de site), te vervangen door echte foto's
  zodra beschikbaar. Bestandsnamen bijv. `review-1.jpg` … `review-4.jpg`.

## Buiten scope

- Echte klantfoto's/portretten (privacy/toestemming) — later.
- Een zichtbaar gemiddeld-rating-getal (vermeden i.v.m. geen-grote-getallen).
- Wijzigingen aan andere secties of het navigatiesysteem.
