import { CircleCheck, CircleX, List, Send } from 'lucide-react'
import StatusTabs from '../ui/StatusTabs'

// Same icons as ApplicationStatusBadge, so a filter and its badge look alike.
const STATUS_FILTERS = [
  { value: 'Submitted', label: 'To review', icon: Send },
  { value: 'Accepted', label: 'Accepted', icon: CircleCheck },
  { value: 'Rejected', label: 'Rejected', icon: CircleX },
  { value: 'All', label: 'All', icon: List },
]

// Status tabs on the left, the post filter on the right (below the tabs when there's no room).
// countFor(status) returns how many applicants a tab holds.
export default function ApplicantsToolbar({ statusFilter, onStatusChange, countFor, postFilter, posts, onPostChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <StatusTabs
        label="Filter by status"
        options={STATUS_FILTERS.map((filter) => ({ ...filter, count: countFor(filter.value) }))}
        selected={statusFilter}
        onSelect={onStatusChange}
      />
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <label htmlFor="post-filter" className="text-sm whitespace-nowrap text-muted">
          Filter by post
        </label>
        <select
          id="post-filter"
          value={postFilter}
          onChange={(event) => onPostChange(event.target.value)}
          className="h-9 min-w-0 flex-1 rounded-card border border-line-strong bg-surface px-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:max-w-72 sm:text-sm"
        >
          <option value="all">All posts</option>
          {posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
