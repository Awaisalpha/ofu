import { Banknote, CalendarClock, MapPin } from 'lucide-react'
import { describeDaysLeft, formatDate, getDeadlineStatus } from '../../utils/dates'
import KeyFact from './KeyFact'

// The location, deadline and stipend strip on the student and alumni detail pages.
// It follows its own width (a container query, @2xl = 672px), so it stacks on phones and
// also when the sidebar leaves too little room for three columns.
export default function KeyFacts({ opportunity }) {
  const isClosed = getDeadlineStatus(opportunity.deadline) === 'closed'

  return (
    <div className="@container">
      <dl className="grid divide-y divide-line border-y border-line bg-canvas @2xl:grid-cols-3 @2xl:divide-x @2xl:divide-y-0">
        <KeyFact icon={MapPin} label="Location">
          {opportunity.location}
        </KeyFact>
        <KeyFact icon={CalendarClock} label={isClosed ? 'Closed on' : 'Deadline'}>
          {formatDate(opportunity.deadline)}
          <span className="ml-1.5 font-normal text-muted">· {describeDaysLeft(opportunity.deadline)}</span>
        </KeyFact>
        {opportunity.stipend && (
          <KeyFact icon={Banknote} label="Stipend / reward">
            {opportunity.stipend}
          </KeyFact>
        )}
      </dl>
    </div>
  )
}
