import { Banknote, MapPin, Tag } from 'lucide-react'
import { Link } from 'react-router'
import { describePostedAgo, getDeadlineStatus } from '../../utils/dates'
import { getInitials, getInitialsTint } from '../../utils/initials'
import DeadlineBadge from './DeadlineBadge'
import InfoChip from './InfoChip'
import SaveButton from './SaveButton'

// The title link stretches over the whole card (its ::after covers it), so the card is
// clickable while the save button stays a separate control, not nested inside the link.
// The footer sits at mt-auto, so cards in the same grid row line up at the bottom.
// headingLevel lets a page that already has h2 sections (the landing page) use h3 titles.
// isPreview is for the Post opportunity form: no link, no save button, and the
// deadline may still be empty.
export default function OpportunityCard({ opportunity, headingLevel = 2, isPreview = false }) {
  const isClosed = opportunity.deadline !== '' && getDeadlineStatus(opportunity.deadline) === 'closed'
  const Heading = `h${headingLevel}`

  return (
    <article
      className={`relative flex h-full flex-col rounded-card border border-line px-4 pt-4 pb-3 ${
        isClosed ? 'bg-canvas' : 'bg-surface'
      } ${
        isPreview
          ? ''
          : 'hover:border-line-strong hover:shadow-card-hover motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150'
      }`}
    >
      <div className={`flex gap-3 ${isPreview ? '' : 'pr-8'}`}>
        {/* Decorative: the organisation name is written next to it. */}
        <span
          aria-hidden="true"
          className={`grid size-10 shrink-0 place-items-center rounded-card text-sm font-semibold ${getInitialsTint(
            opportunity.organisation,
          )}`}
        >
          {getInitials(opportunity.organisation)}
        </span>
        <div className="min-w-0 flex-1">
          {/* title shows the full text on hover; the detail page always has it. */}
          <Heading
            title={opportunity.title}
            className={`line-clamp-2 text-[15px] leading-5 font-semibold ${isClosed ? 'text-muted' : ''}`}
          >
            {isPreview ? (
              opportunity.title
            ) : (
              <Link
                to={`/student/opportunities/${opportunity.id}`}
                className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
              >
                {opportunity.title}
              </Link>
            )}
          </Heading>
          <p className="mt-0.5 truncate text-[13px] leading-5 text-muted">{opportunity.organisation}</p>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        <InfoChip icon={Tag}>{opportunity.type}</InfoChip>
        <InfoChip icon={MapPin}>{opportunity.location}</InfoChip>
        <InfoChip icon={Banknote}>{opportunity.stipend || 'No stipend listed'}</InfoChip>
      </ul>

      <div className="mt-auto pt-3">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-line pt-2.5">
          {opportunity.deadline ? (
            <DeadlineBadge deadline={opportunity.deadline} />
          ) : (
            <span className="text-xs leading-5 text-muted">No deadline set</span>
          )}
          {/* ml-auto keeps it on the right when a narrow card wraps it under the badge. */}
          <span className="ml-auto text-xs leading-5 whitespace-nowrap text-muted">
            Posted {describePostedAgo(opportunity.postedAt)}
          </span>
        </div>
      </div>

      {/* Sits above the stretched link so it gets its own clicks. */}
      {!isPreview && (
        <div className="absolute top-2 right-2 z-10">
          <SaveButton opportunity={opportunity} />
        </div>
      )}
    </article>
  )
}
