import { NavLink } from 'react-router'
import NavCountBadge from './NavCountBadge'
import { navItemsByRole } from './navItems'
import { navLinkClasses } from './navLinkClasses'

// A row of pills under the top bar on small screens.
// Icons are hidden on the narrowest phones so a label and its count always fit.
export default function MobileNav({ role }) {
  return (
    <nav aria-label="Main" className="border-b border-line bg-surface px-2 py-1.5 md:hidden">
      <ul className="flex gap-1">
        {navItemsByRole[role].map(({ label, to, icon: Icon, countKey }) => (
          <li key={to} className="min-w-0 flex-1">
            <NavLink to={to} className={(state) => `${navLinkClasses(state)} justify-center gap-1.5 px-1.5`}>
              <Icon size={16} className="max-[400px]:hidden" aria-hidden="true" />
              {label}
              {countKey && <NavCountBadge countKey={countKey} />}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
