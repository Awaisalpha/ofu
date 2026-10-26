import { Link, Outlet } from 'react-router'
import MobileNav from './MobileNav'
import RoleSwitcher from './RoleSwitcher'
import Sidebar from './Sidebar'

export default function AppShell({ role }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
        <Link
          to="/"
          className="rounded text-xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          OFU
        </Link>
        <RoleSwitcher role={role} />
      </header>

      <div className="flex flex-1">
        <Sidebar role={role} />
        {/* Bottom padding keeps content clear of the fixed mobile nav. */}
        <main className="flex-1 p-4 pb-24 md:p-8">
          <Outlet />
        </main>
      </div>

      <MobileNav role={role} />
    </div>
  )
}
