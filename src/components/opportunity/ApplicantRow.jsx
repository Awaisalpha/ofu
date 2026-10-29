import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import ApplicationStatusBadge from './ApplicationStatusBadge'
import Avatar from '../ui/Avatar'
import { getAvatarTint } from '../../utils/avatarTint'
import { formatDate } from '../../utils/dates'
import DecisionActions from './DecisionActions'
import PortfolioLink from './PortfolioLink'

// One applicant under a post. Read note opens the cover note and portfolio inside the row.
// Narrow rows put the name on top and the badge, Read note and buttons on a second line.
// The row is focusable from code, so focus has somewhere to go after a decision.
export default function ApplicantRow({ entry, onDecide, onUndo }) {
  const { application, student } = entry
  const [isExpanded, setIsExpanded] = useState(false)
  const noteId = `cover-note-${application.id}`

  return (
    <div
      id={`applicant-row-${application.id}`}
      tabIndex={-1}
      className="@container px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex flex-col gap-2 @2xl:flex-row @2xl:items-center @2xl:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Avatar name={student.name} tintClassName={getAvatarTint(student.name)} className="size-8 text-xs" />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] leading-6 font-medium">{student.name}</h3>
            <p className="text-[13px] leading-5 text-muted tabular-nums">Applied {formatDate(application.appliedAt)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pl-11 @2xl:pl-0">
          <ApplicationStatusBadge status={application.status} />
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={noteId}
            className="inline-flex items-center gap-1 rounded py-1 text-sm font-medium text-accent-strong underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isExpanded ? 'Hide note' : 'Read note'}
            <span className="sr-only"> from {student.name}</span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`motion-safe:transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          <DecisionActions application={application} student={student} onDecide={onDecide} onUndo={onUndo} />
        </div>
      </div>

      <div id={noteId} hidden={!isExpanded} className="mt-3 rounded-card bg-canvas p-4 @2xl:ml-11">
        <div className="max-w-[65ch] space-y-2 text-sm leading-6 text-pretty text-ink">
          {application.coverNote.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {application.portfolioUrl && (
          <div className="mt-3">
            <PortfolioLink url={application.portfolioUrl} studentName={student.name} size="sm" />
          </div>
        )}
      </div>
    </div>
  )
}
