import { ChevronRight, CircleCheck } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../../utils/dates'
import { getInitials, getInitialsTint } from '../../utils/initials'
import ApplicationStatusBadge from './ApplicationStatusBadge'

// One row of the bordered list. The title link stretches over the whole row, so the
// row opens the opportunity detail page. On phones the date and badge sit under the
// title; from sm they move to the right.
export default function ApplicationRow({ application, opportunity }) {
  return (
    <div className="relative flex items-center gap-3 px-4 py-3 hover:bg-canvas motion-safe:transition-colors">
      {/* Decorative: the organisation name is written next to it. */}
      <span
        aria-hidden="true"
        className={`grid size-10 shrink-0 place-items-center self-start rounded-card text-sm font-semibold sm:self-center ${getInitialsTint(
          opportunity.organisation,
        )}`}
      >
        {getInitials(opportunity.organisation)}
      </span>

      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 text-[15px] leading-5 font-semibold sm:truncate" title={opportunity.title}>
            {/* The ring is drawn inside the row, because the list clips anything outside it. */}
            <Link
              to={`/student/opportunities/${opportunity.id}`}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
            >
              {opportunity.title}
            </Link>
          </h2>
          <p className="mt-0.5 truncate text-[13px] leading-5 text-muted">{opportunity.organisation}</p>
          {application.status === 'Accepted' && (
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] leading-5 text-muted">
              <CircleCheck size={13} className="shrink-0 text-open" aria-hidden="true" />
              The poster will contact you by email.
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 sm:mt-0 sm:shrink-0 sm:flex-nowrap">
          <p className="text-[13px] text-muted sm:w-36">Applied {formatDate(application.appliedAt)}</p>
          <div className="sm:w-24">
            <ApplicationStatusBadge status={application.status} />
          </div>
        </div>
      </div>

      <ChevronRight size={16} className="shrink-0 text-muted" aria-hidden="true" />
    </div>
  )
}
