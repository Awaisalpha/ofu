import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../../utils/dates'
import ApplicationStatusBadge from './ApplicationStatusBadge'

// A stacked card on phones, one row inside the list's border on larger screens.
// The whole row opens the opportunity detail page.
export default function ApplicationRow({ application, opportunity }) {
  return (
    <Link
      to={`/student/opportunities/${opportunity.id}`}
      className="flex flex-col gap-2 rounded-card border border-line bg-surface px-4 py-3 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:border-0 sm:py-3.5 sm:hover:bg-canvas"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] leading-5 font-semibold" title={opportunity.title}>
          {opportunity.title}
        </p>
        <p className="mt-0.5 truncate text-[13px] text-muted">{opportunity.organisation}</p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:contents">
        <p className="text-[13px] text-muted sm:w-36">Applied {formatDate(application.appliedAt)}</p>
        <div className="sm:w-28">
          <ApplicationStatusBadge status={application.status} />
        </div>
      </div>

      <ChevronRight size={16} className="hidden shrink-0 text-muted sm:block" aria-hidden="true" />
    </Link>
  )
}
