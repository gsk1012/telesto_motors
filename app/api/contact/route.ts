import { NextResponse } from 'next/server'

/*
 * Ontvangt het contactformulier en mailt het via Resend (REST, geen extra
 * dependency). Vereist RESEND_API_KEY; CONTACT_TO en CONTACT_FROM zijn
 * optioneel. De afzender moet een geverifieerd domein bij Resend gebruiken.
 */

const MAX = 2000

// Alleen verzoeken vanaf onze eigen site (en lokale/preview-omgevingen) accepteren.
const ALLOWED_ORIGIN = /^https?:\/\/((www\.)?telestomotors\.nl|localhost(:\d+)?|[a-z0-9-]+\.vercel\.app)$/

// Eenvoudige limiet per IP. Geheugen is per serverinstantie, dus dit is een eerste
// rem; een firewallregel (bv. Vercel WAF) is de stevigere laag.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (now - times[times.length - 1] >= WINDOW_MS) hits.delete(key)
  }
  return recent.length > MAX_PER_WINDOW
}

const LABELS: Record<string, string> = {
  heeftVoorkeur: 'Heeft al een voorkeur',
  budget: 'Budget',
  typeAuto: 'Type auto',
  brandstof: 'Brandstof',
  naam: 'Naam',
  email: 'E-mail',
  telefoon: 'Telefoon',
  pakket: 'Pakket',
  dagVoorkeur: 'Voorkeursdagen',
  tijdVoorkeur: 'Voorkeurstijd',
  bericht: 'Aanvullende informatie',
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const clean = (v: unknown): string => {
  if (Array.isArray(v)) return v.map(clean).filter(Boolean).join(', ')
  return typeof v === 'string' ? v.trim().slice(0, MAX) : ''
}

export async function POST(req: Request) {
  if (!ALLOWED_ORIGIN.test(req.headers.get('origin') ?? '')) {
    return NextResponse.json({ error: 'Niet toegestaan' }, { status: 403 })
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'onbekend'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Te veel aanvragen, probeer het later opnieuw' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 })
  }

  // Honeypot: echte bezoekers laten dit verborgen veld leeg. Bots die het
  // invullen krijgen een nep-succes, zodat ze niet gaan proberen te omzeilen.
  if (clean(body.website)) return NextResponse.json({ ok: true })

  const naam = clean(body.naam)
  const email = clean(body.email)
  if (!naam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Naam en geldig e-mailadres zijn verplicht' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY ontbreekt')
    return NextResponse.json({ error: 'Verzenden is niet ingesteld' }, { status: 500 })
  }

  const value = (key: string) => {
    const v = clean(body[key])
    return key === 'heeftVoorkeur' && v ? v.charAt(0).toUpperCase() + v.slice(1) : v
  }
  const group = (keys: string[]) =>
    keys.map((key) => [LABELS[key], value(key)] as const).filter(([, v]) => v)

  const telefoon = clean(body.telefoon)
  const bericht = clean(body.bericht)
  const sections = [
    { title: 'Zoekopdracht', rows: group(['heeftVoorkeur', 'budget', 'typeAuto', 'brandstof', 'pakket']) },
    { title: 'Planning', rows: group(['dagVoorkeur', 'tijdVoorkeur']) },
  ].filter((section) => section.rows.length)

  const BRONZE = '#A68463'
  const INK = '#191D23'
  const FONT = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"

  const sectionHtml = sections
    .map(
      (section) => `
        <tr><td style="padding:28px 40px 0">
          <p style="margin:0 0 10px;font:600 11px ${FONT};letter-spacing:.16em;text-transform:uppercase;color:${BRONZE}">${escapeHtml(section.title)}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${section.rows
              .map(
                ([label, v], i) => `<tr>
              <td style="padding:12px 0;width:38%;vertical-align:top;font:400 14px ${FONT};color:#7A7F87;${i ? 'border-top:1px solid #ECE6DF' : ''}">${escapeHtml(label)}</td>
              <td style="padding:12px 0;vertical-align:top;font:500 15px ${FONT};color:${INK};${i ? 'border-top:1px solid #ECE6DF' : ''}">${escapeHtml(v)}</td>
            </tr>`,
              )
              .join('')}
          </table>
        </td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html lang="nl"><body style="margin:0;padding:0;background:#EFEAE4">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Nieuwe aanvraag van ${escapeHtml(naam)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFEAE4"><tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden">
    <tr><td style="background:${INK};padding:32px 40px">
      <p style="margin:0;font:600 12px ${FONT};letter-spacing:.28em;text-transform:uppercase;color:${BRONZE}">Telesto Motors</p>
      <h1 style="margin:14px 0 0;font:300 28px/1.25 Georgia,'Times New Roman',serif;color:#FFFFFF">Nieuwe aanvraag</h1>
    </td></tr>
    <tr><td style="padding:32px 40px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3EE;border-radius:12px;border-left:3px solid ${BRONZE}"><tr><td style="padding:20px 24px">
        <p style="margin:0;font:600 20px ${FONT};color:${INK}">${escapeHtml(naam)}</p>
        <p style="margin:8px 0 0;font:400 15px/1.6 ${FONT}"><a href="mailto:${escapeHtml(email)}" style="color:${BRONZE};text-decoration:none">${escapeHtml(email)}</a>${
          telefoon ? `<br><a href="tel:${escapeHtml(telefoon.replace(/[^\d+]/g, ''))}" style="color:${INK};text-decoration:none">${escapeHtml(telefoon)}</a>` : ''
        }</p>
      </td></tr></table>
    </td></tr>${sectionHtml}${
      bericht
        ? `
    <tr><td style="padding:28px 40px 0">
      <p style="margin:0 0 10px;font:600 11px ${FONT};letter-spacing:.16em;text-transform:uppercase;color:${BRONZE}">Aanvullende informatie</p>
      <p style="margin:0;padding:16px 20px;background:#F7F3EE;border-radius:12px;font:400 15px/1.65 ${FONT};color:${INK}">${escapeHtml(bericht).replace(/\n/g, '<br>')}</p>
    </td></tr>`
        : ''
    }
    <tr><td align="center" style="padding:36px 40px 40px">
      <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Re: je aanvraag bij Telesto Motors')}" style="display:inline-block;padding:14px 32px;background:${INK};border:1px solid ${BRONZE};border-radius:999px;font:600 15px ${FONT};color:#FFFFFF;text-decoration:none">Beantwoord ${escapeHtml(naam.split(' ')[0])}</a>
    </td></tr>
    <tr><td style="background:#F7F3EE;padding:18px 40px;font:400 12px ${FONT};color:#7A7F87;text-align:center">Verzonden via het contactformulier op telestomotors.nl</td></tr>
  </table>
</td></tr></table>
</body></html>`

  const text = [
    `Nieuwe aanvraag van ${naam}`,
    `E-mail: ${email}`,
    telefoon && `Telefoon: ${telefoon}`,
    ...sections.flatMap((section) => section.rows.map(([label, v]) => `${label}: ${v}`)),
    bericht && `Aanvullende informatie: ${bericht}`,
  ]
    .filter(Boolean)
    .join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? 'Telesto Motors <noreply@telestomotors.nl>',
      to: [process.env.CONTACT_TO ?? 'info@telestomotors.nl'],
      reply_to: email,
      subject: `Nieuwe aanvraag van ${naam.replace(/[\r\n]+/g, ' ')}`,
      html,
      text,
    }),
  })

  if (!res.ok) {
    console.error('Resend fout', res.status, await res.text())
    return NextResponse.json({ error: 'Verzenden mislukt' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
