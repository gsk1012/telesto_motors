const DEFAULT_ITEMS = [
  'Expertise sinds 2008',
  'Vakkundig advies',
  'Persoonlijke aandacht',
  "5+ jaar ervaring in EV's en hybrides",
  'Specialisme',
]

export default function CredentialsBar({
  items = DEFAULT_ITEMS,
  dark = false,
}: {
  items?: string[]
  dark?: boolean
}) {
  return (
    <section className={dark ? '-mt-px bg-[#14181E]' : 'bg-cream'}>
      <div className="mx-auto max-w-container px-6 py-11 sm:py-12">
        <ul
          className="animate-on-scroll grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4 lg:flex-nowrap lg:justify-between lg:gap-x-6"
          data-delay="0s"
        >
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 sm:whitespace-nowrap">
              <svg className="h-5 w-5 flex-none text-bronze" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.48 3.5a.6.6 0 011.04 0l2.09 5.03a.56.56 0 00.48.35l5.43.44c.5.04.7.66.32.99l-4.14 3.54a.56.56 0 00-.18.56l1.27 5.3a.56.56 0 01-.84.6l-4.65-2.84a.56.56 0 00-.58 0l-4.65 2.84a.56.56 0 01-.84-.6l1.27-5.3a.56.56 0 00-.18-.56L3.16 10.7a.56.56 0 01.32-.99l5.43-.44a.56.56 0 00.48-.35z" />
              </svg>
              <span className={`text-sm font-medium sm:text-base ${dark ? 'text-white/85' : 'text-ink'}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
