import { CircleCheck } from 'lucide-react'
import { formatDate } from '../../utils/dates'
import { getInitials, getInitialsTint } from '../../utils/initials'
import ListRow from '../ui/ListRow'
import TintedSquare from '../ui/TintedSquare'
import ApplicationStatusBadge from './ApplicationStatusBadge'

// The whole row opens the opportunity detail page.
export default function ApplicationRow({ application, opportunity }) {
  return (
    <ListRow
      leading={
        <TintedSquare tintClassName={getInitialsTint(opportunity.organisation)}>
          {getInitials(opportunity.organisation)}
        </TintedSquare>
      }
      title={opportunity.title}
      to={`/student/opportunities/${opportunity.id}`}
      details={
        <>
          <p className="mt-0.5 truncate text-[13px] leading-5 text-muted">{opportunity.organisation}</p>
          {application.status === 'Accepted' && (
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] leading-5 text-muted">
              <CircleCheck size={13} className="shrink-0 text-open" aria-hidden="true" />
              The poster will contact you by email.
            </p>
          )}
        </>
      }
      meta={
        <>
          <p className="text-[13px] text-muted @2xl:w-36">Applied {formatDate(application.appliedAt)}</p>
          <div className="@2xl:w-24">
            <ApplicationStatusBadge status={application.status} />
          </div>
        </>
      }
    />
  )
}
