import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/*
 * CLIENT-DEMO modus (alleen op de branch 'client-demo').
 * Direct ingetypte of gedeelde URL's naar andere pagina's worden teruggestuurd
 * naar de homepage. Alleen '/', '/privacybeleid', '/plans' en '/over-ons' zijn
 * bereikbaar (de homepage linkt door naar /plans en /over-ons, dus die blijven
 * ook toegankelijk).
 */
const ALLOWED = new Set(['/', '/privacybeleid', '/plans', '/over-ons'])

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/+$/, '') || '/'
  if (ALLOWED.has(path)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/'
  url.search = ''
  return NextResponse.redirect(url)
}

export const config = {
  // Next-assets, API en bestanden met extensie (afbeeldingen, video) overslaan.
  matcher: ['/((?!_next/|api/|.*\\.[^/]+$).*)'],
}
