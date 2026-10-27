import { NavLink } from 'react-router'
import { navItemsByRole, roleLabels } from './navItems'
import { navLinkClasses } from './navLinkClasses'
import Wordmark from './Wordmark'

export default function Sidebar({ role }) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-line bg-surface md:block">
      <div className="flex h-14 items-center border-b border-line px-4">
        <Wordmark />
      </div>
      <nav aria-label="Main" className="p-2">
        <p className="px-3 pt-2 pb-1.5 text-xs font-medium text-muted">{roleLabels[role]}</p>
        <ul className="space-y-0.5">
          {navItemsByRole[role].map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} className={(state) => `${navLinkClasses(state)} gap-2.5 px-3`}>
                <Icon size={16} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
