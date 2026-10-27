import { NavLink } from 'react-router'
import { navItemsByRole } from './navItems'
import { navLinkClasses } from './navLinkClasses'

// A row of pills under the top bar on small screens.
export default function MobileNav({ role }) {
  return (
    <nav aria-label="Main" className="border-b border-line bg-surface px-2 py-1.5 md:hidden">
      <ul className="flex gap-1">
        {navItemsByRole[role].map(({ label, to, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink to={to} className={(state) => `${navLinkClasses(state)} justify-center gap-1.5 px-1.5`}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
