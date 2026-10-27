import { Banknote, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { getDeadlineStatus } from '../../utils/dates'
import Badge from '../ui/Badge'
import DeadlineBadge from './DeadlineBadge'
import SaveButton from './SaveButton'

// Fixed line heights keep every card the same size as OpportunityCardSkeleton.
// The title link stretches over the whole card (its ::after covers it), so the card is
// clickable while the save button stays a separate control, not nested inside the link.
export default function OpportunityCard({ opportunity }) {
  const isClosed = getDeadlineStatus(opportunity.deadline) === 'closed'

  return (
    <article
      className={`relative flex h-full flex-col rounded-card border border-line px-4 pt-3.5 pb-3 ${
        isClosed ? 'bg-canvas' : 'bg-surface hover:border-line-strong'
      }`}
    >
      <div className="flex h-5 items-center gap-2 pr-8">
        <Badge>{opportunity.type}</Badge>
        <span className="truncate text-xs font-medium text-muted">{opportunity.organisation}</span>
      </div>
      {/* title shows the full text on hover; the detail page always has it. */}
      <h2
        title={opportunity.title}
        className={`mt-2 line-clamp-2 h-10 text-[15px] leading-5 font-semibold ${isClosed ? 'text-muted' : ''}`}
      >
        <Link
          to={`/student/opportunities/${opportunity.id}`}
          className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
        >
          {opportunity.title}
        </Link>
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

      {/* Sits above the stretched link so it gets its own clicks. */}
      <div className="absolute top-2 right-2 z-10">
        <SaveButton opportunity={opportunity} />
      </div>
    </article>
  )
}
