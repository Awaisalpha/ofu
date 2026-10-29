import { CircleCheck, CircleX } from 'lucide-react'
import Button from '../ui/Button'
import { formatDate } from '../../utils/dates'

const DECISION_STYLES = {
  Accepted: { icon: CircleCheck, className: 'text-open' },
  Rejected: { icon: CircleX, className: 'text-danger' },
}

// Reject and Accept for a submitted application, or the decision with an Undo once it's made.
// The labels add the student's name, because a list has many buttons called "Accept".
// The buttons stretch side by side until ApplicantRow's container has room for one line.
export default function DecisionActions({ application, student, onDecide, onUndo }) {
  if (application.status === 'Submitted') {
    return (
      <div className="flex w-full gap-2 @2xl:w-auto">
        <Button
          variant="secondary"
          aria-label={`Reject ${student.name}`}
          onClick={() => onDecide(application, student, 'Rejected')}
          className="flex-1 @2xl:flex-none"
        >
          Reject
        </Button>
        <Button
          aria-label={`Accept ${student.name}`}
          onClick={() => onDecide(application, student, 'Accepted')}
          className="flex-1 @2xl:flex-none"
        >
          Accept
        </Button>
      </div>
    )
  }

  const { icon: Icon, className } = DECISION_STYLES[application.status]
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <p className={`inline-flex items-center gap-1.5 text-sm font-medium ${className}`}>
        <Icon size={16} aria-hidden="true" className="shrink-0" />
        {application.status}
        {/* Older saved demo data has no decision date. */}
        {application.decidedAt && ` on ${formatDate(application.decidedAt)}`}
      </p>
      <button
        type="button"
        aria-label={`Undo decision for ${student.name}`}
        onClick={() => onUndo(application, student)}
        className="rounded py-1 text-sm font-medium text-accent-strong underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Undo
      </button>
    </div>
  )
}
