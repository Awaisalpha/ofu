import { Link } from 'react-router'
import { useApp } from '../../store/AppContext'

const sectionLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Closing soon', href: '#closing-soon' },
  { label: 'FAQ', href: '#faq' },
]

// h-10 keeps every item a 40px click target. Muted text passes AA on white (7.6:1).
const linkClasses =
  'inline-flex h-10 items-center rounded-full px-3 text-sm font-medium whitespace-nowrap text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function FooterLinks() {
  const { dispatch } = useApp()

  function resetDemoData() {
    if (window.confirm('Reset all demo data? Your changes will be lost.')) {
      dispatch({ type: 'RESET_DEMO' })
    }
  }

  return (
    <nav aria-label="Footer">
      <ul className="flex flex-wrap justify-center gap-x-1 gap-y-1">
        {sectionLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={linkClasses}>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <Link to="/student/browse" className={linkClasses}>
            Browse
          </Link>
        </li>
        <li>
          <a href="https://github.com/Awaisalpha/ofu" target="_blank" rel="noopener noreferrer" className={linkClasses}>
            Source code
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <button type="button" onClick={resetDemoData} className={`cursor-pointer ${linkClasses}`}>
            Reset demo data
          </button>
        </li>
      </ul>
    </nav>
  )
}
