import { Link } from 'react-router'
import { typeLinks } from './typeLinks'

// Quick links that sit on the dark hero photo, so they use a white focus ring.
export default function TypeChips() {
  return (
    <ul aria-label="Browse by type" className="flex flex-wrap justify-center gap-2">
      {typeLinks.map(({ type, label, icon: Icon, to }) => (
        <li key={type}>
          <Link
            to={to}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-3.5 text-sm font-medium text-ink hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Icon size={15} className="text-accent" aria-hidden="true" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
