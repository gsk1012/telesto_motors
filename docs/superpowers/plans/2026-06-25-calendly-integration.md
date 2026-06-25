# Calendly Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tabbed contact section that lets visitors choose between booking a Calendly appointment or filling in the existing multi-step contact form.

**Architecture:** Two new client components — `CalendlyWidget` (pure iframe embed) and `ContactTabs` (tab state + conditional render) — drop into the existing `#contact` section in `page.tsx` by replacing the bare `<ContactForm />` with `<ContactTabs />`.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Calendly iframe embed (no external script)

## Global Constraints

- Calendly URL constant: `https://calendly.com/bluestardevelopment-info/intake-gesprek-telesto-motors` — **the client will swap this with their own URL later**
- Design tokens: `bg-bronze` / `text-bronze` for active state, `bg-ink/6` for tab track, `rounded-full` pill tabs — match existing button style
- All new components are client components (`'use client'`)
- No external npm packages — plain iframe embed only
- `ContactForm` component is **not modified**

---

### Task 1: CalendlyWidget component

**Files:**
- Create: `app/components/CalendlyWidget.tsx`

**Interfaces:**
- Consumes: nothing (URL is an internal constant)
- Produces: `export default function CalendlyWidget(): JSX.Element`

- [ ] **Step 1: Create the file**

```tsx
'use client'

const CALENDLY_URL =
  'https://calendly.com/bluestardevelopment-info/intake-gesprek-telesto-motors'

export default function CalendlyWidget() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <iframe
        src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=111111&primary_color=C08B5C`}
        className="w-full border-0"
        style={{ height: 700 }}
        title="Plan een afspraak"
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npx next build 2>&1 | tail -20
```

Expected: no TypeScript or build errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/CalendlyWidget.tsx
git commit -m "feat: add CalendlyWidget iframe component"
```

---

### Task 2: ContactTabs component

**Files:**
- Create: `app/components/ContactTabs.tsx`

**Interfaces:**
- Consumes: `CalendlyWidget` from `./CalendlyWidget`, `ContactForm` from `./ContactForm`
- Produces: `export default function ContactTabs(): JSX.Element`

- [ ] **Step 1: Create the file**

```tsx
'use client'

import { useState } from 'react'
import CalendlyWidget from './CalendlyWidget'
import ContactForm from './ContactForm'

type Tab = 'afspraak' | 'bericht'

const TABS: { id: Tab; label: string }[] = [
  { id: 'afspraak', label: 'Plan een afspraak' },
  { id: 'bericht', label: 'Stuur een bericht' },
]

export default function ContactTabs() {
  const [active, setActive] = useState<Tab>('afspraak')

  return (
    <div>
      <div className="mb-8 flex gap-1 rounded-full bg-ink/6 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`btn-label flex-1 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
              active === tab.id
                ? 'bg-white text-ink shadow-sm'
                : 'text-ink/50 hover:text-ink/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'afspraak' ? <CalendlyWidget /> : <ContactForm />}
    </div>
  )
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npx next build 2>&1 | tail -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/ContactTabs.tsx
git commit -m "feat: add ContactTabs with Calendly and form toggle"
```

---

### Task 3: Wire ContactTabs into page.tsx

**Files:**
- Modify: `app/page.tsx` — contact section (lines ~258–276)

**Interfaces:**
- Consumes: `ContactTabs` from `./components/ContactTabs`
- Produces: updated `#contact` section rendering `<ContactTabs />` instead of `<ContactForm />`

- [ ] **Step 1: Update the import at the top of `page.tsx`**

Remove:
```tsx
import ContactForm from "./components/ContactForm";
```

Add:
```tsx
import ContactTabs from "./components/ContactTabs";
```

- [ ] **Step 2: Replace `<ContactForm />` with `<ContactTabs />` in the contact section**

Find this block (~line 272):
```tsx
          <div className="animate-on-scroll mx-auto mt-12 max-w-2xl" data-delay="0.28s">
            <ContactForm />
          </div>
```

Replace with:
```tsx
          <div className="animate-on-scroll mx-auto mt-12 max-w-2xl" data-delay="0.28s">
            <ContactTabs />
          </div>
```

- [ ] **Step 3: Verify the build compiles**

```bash
npx next build 2>&1 | tail -20
```

Expected: no TypeScript or lint errors.

- [ ] **Step 4: Start dev server and manually verify**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser and check:

1. Scroll to `#contact` — "Plan een afspraak" tab is active by default
2. Calendly iframe loads and shows the booking calendar
3. Click "Stuur een bericht" tab — ContactForm appears (multi-step form works as before)
4. Click "Plan een afspraak" tab again — Calendly iframe reappears
5. Click "Afspraak maken" in the hero — scrolls to contact, Calendly tab already active
6. On mobile (DevTools responsive mode): tabs stack properly, no horizontal overflow

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace ContactForm with ContactTabs in contact section"
```
