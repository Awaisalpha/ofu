import { SearchX } from 'lucide-react'
import { useState } from 'react'
import UserRow from '../../components/admin/UserRow'
import UserToolbar from '../../components/admin/UserToolbar'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { CURRENT_ADMIN_ID } from '../../data/users'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../store/ToastContext'

export default function Users() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const search = searchText.trim().toLowerCase()
  const matchingUsers = state.users.filter(
    (user) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search),
  )
  const filteredUsers =
    roleFilter === 'all' ? matchingUsers : matchingUsers.filter((user) => user.role === roleFilter)
  // "YYYY-MM-DD" dates sort correctly as text.
  const visibleUsers = [...filteredUsers].sort((a, b) =>
    sortBy === 'name' ? a.name.localeCompare(b.name) : b.joinedAt.localeCompare(a.joinedAt),
  )

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
    <section className="mx-auto max-w-4xl">
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">
        Users <span className="font-normal text-muted tabular-nums">({visibleUsers.length})</span>
      </h1>

      <div className="mt-4">
        <UserToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          countFor={countFor}
        />
      </div>

      <div className="mt-6">
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
          <ul className="border-t border-line">
            {visibleUsers.map((user) => (
              <UserRow key={user.id} user={user} isCurrentAdmin={user.id === CURRENT_ADMIN_ID} onToggle={toggleUser} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
