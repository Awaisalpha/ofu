import { ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { formatDate } from '../../utils/dates'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import ApplicationStatusBadge from './ApplicationStatusBadge'
import ExpandableText from './ExpandableText'

export default function ApplicantCard({ application, student, opportunity, onDecide }) {
  const cardRef = useRef(null)

  // The Accept and Reject buttons disappear after a decision, so focus moves
  // to the card instead of being lost.
  function decide(status) {
    onDecide(application, student, status)
    cardRef.current.focus()
  }

  return (
    <article
      ref={cardRef}
      tabIndex={-1}
      aria-labelledby={`applicant-${application.id}`}
      className="rounded-card border border-line bg-surface p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
    >
      <div className="flex items-start gap-3">
        <Avatar name={student.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <h2 id={`applicant-${application.id}`} className="text-[15px] leading-5 font-semibold">
              {student.name}
            </h2>
            <ApplicationStatusBadge status={application.status} />
          </div>
          <p className="mt-0.5 text-[13px] leading-5 text-muted">
            Applied to <span className="font-medium text-ink">{opportunity.title}</span> on{' '}
            {formatDate(application.appliedAt)}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="sr-only">Cover note</h3>
        <ExpandableText id={`cover-note-${application.id}`} text={application.coverNote} clampClassName="line-clamp-3" />
      </div>

      {application.portfolioUrl && (
        <a
          href={application.portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded text-sm font-medium text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ExternalLink size={14} className="shrink-0" aria-hidden="true" />
          <span className="truncate">Portfolio</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}

      {application.status === 'Submitted' && (
        <div className="mt-4 flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => decide('Rejected')}>
            Reject
          </Button>
          <Button onClick={() => decide('Accepted')}>Accept</Button>
        </div>
      )}
    </article>
  )
}
