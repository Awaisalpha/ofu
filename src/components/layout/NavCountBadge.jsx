import { getAlumniApplications, getStudentApplications } from '../../store/reducer'
import { useApp } from '../../store/AppContext'

// The alumnus sees how many applicants still need a decision.
function getCount(state, countKey) {
  if (countKey === 'saved') return state.savedOpportunityIds.length
  if (countKey === 'applications') return getStudentApplications(state).length
  return getAlumniApplications(state).filter((application) => application.status === 'Submitted').length
}

// Small count next to a nav label; hidden when the count is zero.
export default function NavCountBadge({ countKey }) {
  const { state } = useApp()
  const count = getCount(state, countKey)

  if (count === 0) return null

  return (
    <span className="min-w-5 rounded-full bg-line px-1.5 text-center text-xs leading-5 font-semibold text-ink tabular-nums">
      <span className="sr-only">(</span>
      {count}
      <span className="sr-only">)</span>
    </span>
  )
}
