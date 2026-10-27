import { Banknote, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { getDeadlineStatus } from '../../utils/dates'
import Badge from '../ui/Badge'
import DeadlineBadge from './DeadlineBadge'

// Fixed line heights keep every card the same size as OpportunityCardSkeleton.
export default function OpportunityCard({ opportunity }) {
  const isClosed = getDeadlineStatus(opportunity.deadline) === 'closed'

  return (
    <Link
      to={`/student/opportunities/${opportunity.id}`}
      className={`flex h-full flex-col rounded-card border border-line px-4 pt-3.5 pb-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isClosed ? 'bg-canvas' : 'bg-surface hover:border-line-strong'
      }`}
    >
      <div className="flex h-5 items-center gap-2">
        <Badge>{opportunity.type}</Badge>
        <span className="truncate text-xs font-medium text-muted">{opportunity.organisation}</span>
      </div>
      {/* title shows the full text on hover; the detail page always has it. */}
      <h2 title={opportunity.title} className="mt-2 line-clamp-2 h-10 text-[15px] leading-5 font-semibold">
        {opportunity.title}
      </h2>
      <div className="mt-2 space-y-0.5 text-[13px] text-muted">
        <p className="flex h-5 items-center gap-1.5">
          <MapPin size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{opportunity.location}</span>
        </p>
        <p className="flex h-5 items-center gap-1.5">
          <Banknote size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{opportunity.stipend || 'No stipend listed'}</span>
        </p>
      </div>
      <div className="mt-3 border-t border-line pt-2.5">
        <DeadlineBadge deadline={opportunity.deadline} />
      </div>
    </Link>
  )
}
