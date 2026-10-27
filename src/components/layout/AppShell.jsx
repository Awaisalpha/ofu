import { Outlet } from 'react-router'
import MobileNav from './MobileNav'
import RoleSwitcher from './RoleSwitcher'
import Sidebar from './Sidebar'
import Wordmark from './Wordmark'

export default function AppShell({ role }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar role={role} />

      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-line bg-surface px-4 md:justify-end md:px-6">
          <div className="md:hidden">
            <Wordmark />
          </div>
          <RoleSwitcher role={role} />
        </header>
        <MobileNav role={role} />

        <main className="px-4 py-5 md:px-6 md:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
