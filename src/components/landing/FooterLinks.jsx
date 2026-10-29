import { Link } from 'react-router'

const sectionLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why OFU', href: '#why-ofu' },
  { label: 'FAQ', href: '#faq' },
]

// h-10 keeps every item a 40px click target. Same hover as the landing page navbar links.
const linkClasses =
  'inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold whitespace-nowrap text-ink hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function FooterLinks() {
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
      </ul>
    </nav>
  )
}
