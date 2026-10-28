import { Briefcase, GraduationCap, Search, ShieldCheck, Users } from 'lucide-react'
import Input from '../ui/Input'
import StatusTabs from '../ui/StatusTabs'

const ROLE_FILTERS = [
  { value: 'all', label: 'All', icon: Users },
  { value: 'student', label: 'Students', icon: GraduationCap },
  { value: 'alumni', label: 'Alumni', icon: Briefcase },
  { value: 'admin', label: 'Admins', icon: ShieldCheck },
]

// Search, role tabs and sort for the Users page. Wraps onto several lines on narrow screens.
// countFor(role) gives the number of users matching the search with that role.
export default function UserToolbar({
  searchText,
  onSearchChange,
  roleFilter,
  onRoleChange,
  sortBy,
  onSortChange,
  countFor,
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <div className="relative w-full sm:w-64">
        <label htmlFor="user-search" className="sr-only">
          Search users by name or email
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
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name or email"
          autoComplete="off"
          className="pr-3 pl-9"
        />
      </div>

      <StatusTabs
        label="Filter by role"
        options={ROLE_FILTERS.map((filter) => ({ ...filter, count: countFor(filter.value) }))}
        selected={roleFilter}
        onSelect={onRoleChange}
      />

      <div className="flex items-center gap-2 xl:ml-auto">
        <label htmlFor="user-sort" className="text-sm whitespace-nowrap text-muted">
          Sort by
        </label>
        <select
          id="user-sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-9 rounded-card border border-line-strong bg-surface px-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="name">Name A to Z</option>
        </select>
      </div>
    </div>
  )
}
