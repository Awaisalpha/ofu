import ButtonLink from '../ui/ButtonLink'
import Wordmark from '../layout/Wordmark'

const sectionLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Opportunity types', href: '#opportunity-types' },
  { label: 'Try a role', href: '#try-a-role' },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// Plain <a> for the section links: the browser scrolls to the hash, React Router doesn't.
// Under 768px only the wordmark and Try the demo show, so no menu is needed.
export default function LandingNav() {
  return (
    <>
      <a
        href="#main"
        className={`sr-only rounded-card bg-surface text-sm font-medium shadow-float focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 ${focusRing}`}
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Wordmark />
          <nav aria-label="Page sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`rounded-card px-3 py-2 text-sm font-medium text-muted hover:text-ink ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink to="/student/browse">Try the demo</ButtonLink>
        </div>
      </header>
    </>
  )
}
