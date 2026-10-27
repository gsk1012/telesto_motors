export interface NavLink {
  label: string
  href: string
}

export const DEFAULT_NAV: NavLink[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Diensten', href: '/diensten' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Pakketten', href: '/plans' },
  { label: 'Contact', href: '/contact' },
]

/** Snelkoppelingen die naast de MENU-knop staan (zoals in het referentieontwerp). */
export const QUICK_NAV: NavLink[] = [
  { label: 'Diensten', href: '/diensten' },
  { label: 'Contact', href: '/contact' },
]

/** Contact- en socialgegevens voor de navigatie. */
export const PHONE_DISPLAY = '+31 6 20779977'
export const PHONE_HREF = 'tel:+31620779977'
export const INSTAGRAM_HREF = 'https://www.instagram.com/telesto.motors'
// TODO: vervang '#' door de Facebook-pagina zodra die bekend is.
export const FACEBOOK_HREF = '#'
