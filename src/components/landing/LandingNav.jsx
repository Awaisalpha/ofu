import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import LahoreClock from './LahoreClock'

const sectionLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why OFU', href: '#why-ofu' },
  { label: 'FAQ', href: '#faq' },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// A glass pill as wide as the page content. Not fixed: it sits over the top of the hero
// photo and scrolls away with the page. Plain <a> for the section links: the browser
// scrolls to the hash, React Router doesn't. Under 768px only the wordmark and
// Try the demo show, so no menu is needed.
export default function LandingNav() {
  return (
    <>
      <a
        href="#main"
        className={`sr-only rounded-card bg-surface text-sm font-medium shadow-float focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 ${focusRing}`}
      >
        Skip to content
      </a>
      <header className="absolute inset-x-0 top-3 z-40">
        {/* Same width and side padding as the page content container. */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Nearly solid where backdrop-filter isn't supported. Ink text passes AA on surface/70
              even over a pure black background (8.5:1). pl-4 and the rounded button keep every
              focus ring inside the rounded ends. */}
          <nav
            aria-label="Main"
            className="flex h-14 items-center gap-4 rounded-full border border-surface/60 bg-surface/95 pr-2 pl-4 shadow-float backdrop-blur-md supports-[backdrop-filter]:bg-surface/70"
          >
            {/* "#top" scrolls to the top of the page even though no element has that id. */}
            <div className="flex flex-1">
              <a href="#top" className={`flex items-center gap-2 rounded-lg ${focusRing}`}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-[11px] font-bold tracking-wide text-white">
                  OFU
                </span>
                <span className="text-sm font-semibold text-ink">Opportunities</span>
                <span className="sr-only">, back to top</span>
              </a>
            </div>

            <ul className="hidden items-center gap-0.5 md:flex">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-ink hover:bg-accent-soft hover:text-accent ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-1 items-center justify-end gap-2">
              {/* Hidden under 1024px, where the pill runs out of room for it. */}
              <div className="hidden lg:block">
                <LahoreClock />
              </div>
              <Link
                to="/student/browse"
                className={`flex h-10 items-center gap-1.5 rounded-full bg-accent pr-3 pl-4 text-sm font-semibold whitespace-nowrap text-white hover:bg-accent-hover ${focusRing}`}
              >
                Try the demo
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
