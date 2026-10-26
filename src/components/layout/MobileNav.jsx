import { NavLink } from 'react-router'
import { navItemsByRole } from './navItems'

export default function MobileNav({ role }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-stone-50 md:hidden"
    >
      <ul className="flex">
        {navItemsByRole[role].map(({ label, to, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive ? 'text-stone-900' : 'text-stone-500'
                }`
              }
            >
              <Icon size={20} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
