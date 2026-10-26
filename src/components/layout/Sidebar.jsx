import { NavLink } from 'react-router'
import { navItemsByRole } from './navItems'

export default function Sidebar({ role }) {
  return (
    <nav aria-label="Main" className="hidden w-56 shrink-0 border-r border-stone-200 p-4 md:block">
      <ul className="space-y-1">
        {navItemsByRole[role].map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-blue-600 ${
                  isActive ? 'bg-stone-200 text-stone-900' : 'text-stone-600 hover:bg-stone-100'
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
