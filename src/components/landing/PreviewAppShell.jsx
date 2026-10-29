import { navItemsByRole, roleLabels } from '../layout/navItems'
import { navLinkClasses } from '../layout/navLinkClasses'

// A copy of the app shell, drawn with plain elements so it holds no links of its own.
// inert: nothing inside can be clicked or focused, so the real page inside never changes
// the store. aria-hidden: screen readers get the tab panel's description instead.
// The first menu item is the page shown. Under 768px the sidebar hides, like the real app.
export default function PreviewAppShell({ role, children }) {
  return (
    <div inert aria-hidden="true" className="flex bg-canvas text-left select-none">
      <div className="w-56 shrink-0 border-r border-line bg-surface max-md:hidden">
        <div className="flex h-14 items-center border-b border-line px-4">
          <span className="rounded bg-accent px-1.5 py-0.5 text-sm font-bold tracking-wide text-white">OFU</span>
        </div>
        <div className="p-2">
          <p className="px-3 pt-2 pb-1.5 text-xs font-medium text-muted">{roleLabels[role]}</p>
          <ul className="space-y-0.5">
            {navItemsByRole[role].map(({ label, icon: Icon }, index) => (
              <li key={label} className={`${navLinkClasses({ isActive: index === 0 })} gap-2.5 px-3`}>
                <Icon size={16} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex h-14 items-center justify-between gap-3 border-b border-line bg-surface px-4 md:justify-end md:px-6">
          <span className="rounded bg-accent px-1.5 py-0.5 text-sm font-bold tracking-wide text-white md:hidden">OFU</span>
          <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white">
            View as {roleLabels[role]}
          </span>
        </div>
        <div className="px-4 py-5 md:px-6 md:py-6">{children}</div>
      </div>
    </div>
  )
}
