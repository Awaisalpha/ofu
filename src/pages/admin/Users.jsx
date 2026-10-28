import { Search, SearchX } from 'lucide-react'
import { useState } from 'react'
import UserCard from '../../components/admin/UserCard'
import UserTable from '../../components/admin/UserTable'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import Input from '../../components/ui/Input'
import StatusTabs from '../../components/ui/StatusTabs'
import { CURRENT_ADMIN_ID } from '../../data/users'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../store/ToastContext'

const ROLE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'student', label: 'Students' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'admin', label: 'Admins' },
]

export default function Users() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const search = searchText.trim().toLowerCase()
  const matchingUsers = state.users.filter((user) => user.name.toLowerCase().includes(search))
  const visibleUsers =
    roleFilter === 'all' ? matchingUsers : matchingUsers.filter((user) => user.role === roleFilter)

  function countFor(role) {
    if (role === 'all') return matchingUsers.length
    return matchingUsers.filter((user) => user.role === role).length
  }

  function clearFilters() {
    setSearchText('')
    setRoleFilter('all')
  }

  function toggleUser(user) {
    dispatch({ type: 'SET_USER_ACTIVE', id: user.id, isActive: !user.isActive })
    showToast({
      message: `${user.isActive ? 'Deactivated' : 'Activated'} ${user.name}`,
      actionLabel: 'Undo',
      onAction: () => dispatch({ type: 'SET_USER_ACTIVE', id: user.id, isActive: user.isActive }),
    })
  }

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">
        Users <span className="font-normal text-muted tabular-nums">({visibleUsers.length})</span>
      </h1>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative lg:w-72">
          <label htmlFor="user-search" className="sr-only">
            Search users by name
          </label>
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            id="user-search"
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by name"
            autoComplete="off"
            className="pr-3 pl-9"
          />
        </div>
        <StatusTabs
          label="Filter by role"
          options={ROLE_FILTERS.map((filter) => ({ ...filter, count: countFor(filter.value) }))}
          selected={roleFilter}
          onSelect={setRoleFilter}
        />
      </div>

      <div className="mt-4">
        {visibleUsers.length === 0 ? (
          <EmptyState
            icon={SearchX}
            message={search ? `No users match “${searchText.trim()}”` : 'No users with this role'}
          >
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </EmptyState>
        ) : (
          <>
            {/* Beside the sidebar a tablet is too narrow for six columns, so the table starts at 1024px. */}
            <div className="hidden lg:block">
              <UserTable users={visibleUsers} currentAdminId={CURRENT_ADMIN_ID} onToggle={toggleUser} />
            </div>
            <ul className="space-y-2 lg:hidden">
              {visibleUsers.map((user) => (
                <li key={user.id}>
                  <UserCard user={user} isCurrentAdmin={user.id === CURRENT_ADMIN_ID} onToggle={toggleUser} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
