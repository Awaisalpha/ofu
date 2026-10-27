import { getStudentApplications } from '../../store/reducer'
import { useApp } from '../../store/AppContext'

// Small count next to a nav label; hidden when the count is zero.
export default function NavCountBadge({ countKey }) {
  const { state } = useApp()
  const count = countKey === 'saved' ? state.savedOpportunityIds.length : getStudentApplications(state).length

  if (count === 0) return null

  return (
    <span className="min-w-5 rounded-full bg-line px-1.5 text-center text-xs leading-5 font-semibold text-ink tabular-nums">
      <span className="sr-only">(</span>
      {count}
      <span className="sr-only">)</span>
    </span>
  )
}
