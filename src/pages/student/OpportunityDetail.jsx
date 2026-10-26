import { ArrowLeft, Bookmark, BookmarkCheck, FileQuestion } from 'lucide-react'
import { Link, useParams } from 'react-router'
import DeadlineBadge from '../../components/opportunity/DeadlineBadge'
import OpportunityDetailSkeleton from '../../components/opportunity/OpportunityDetailSkeleton'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'
import EmptyState from '../../components/ui/EmptyState'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../store/ToastContext'
import { describeDaysLeft, formatDate, getDeadlineStatus } from '../../utils/dates'

const linkClasses =
  'inline-flex items-center gap-1 rounded text-sm font-medium text-stone-600 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-blue-600'

export default function OpportunityDetail() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const isLoading = useSimulatedLoading()

  // Students only ever see approved opportunities, even with a direct link.
  const opportunity = state.opportunities.find((item) => item.id === id && item.status === 'approved')

  const backLink = (
    <Link to="/student/browse" className={linkClasses}>
      <ArrowLeft size={16} aria-hidden="true" />
      Back to opportunities
    </Link>
  )

  if (isLoading) {
    return (
      <section className="max-w-3xl">
        {backLink}
        <div className="mt-4">
          <OpportunityDetailSkeleton />
        </div>
      </section>
    )
  }

  if (!opportunity) {
    return (
      <section className="max-w-3xl">
        <h1 className="sr-only">Opportunity not found</h1>
        <EmptyState icon={FileQuestion} message="This opportunity isn't available.">
          {backLink}
        </EmptyState>
      </section>
    )
  }

  const isSaved = state.savedOpportunityIds.includes(opportunity.id)
  const isClosed = getDeadlineStatus(opportunity.deadline) === 'closed'

  function toggleSaved() {
    dispatch({ type: 'TOGGLE_SAVED', id: opportunity.id })
    showToast({
      message: isSaved ? 'Removed from saved' : 'Saved to your list',
      actionLabel: 'Undo',
      onAction: () => dispatch({ type: 'TOGGLE_SAVED', id: opportunity.id }),
    })
  }

  // Temporary until the apply form is built.
  function apply() {
    showToast({ message: 'The apply form is coming in the next step.' })
  }

  return (
    <section className="max-w-3xl">
      {backLink}

      <article className="mt-4 rounded-lg border border-stone-200 bg-white p-6">
        <div className="flex h-6 flex-wrap items-center gap-2">
          <Badge>{opportunity.type}</Badge>
          <DeadlineBadge deadline={opportunity.deadline} />
        </div>
        <h1 className="mt-3 text-2xl leading-8 font-bold">{opportunity.title}</h1>
        <p className="mt-1 leading-6 text-stone-600">{opportunity.organisation}</p>

        <div className="mt-6 flex h-20 flex-col justify-center rounded-md bg-stone-100 px-4">
          <p className="text-2xl font-bold">{describeDaysLeft(opportunity.deadline)}</p>
          <p className="text-sm text-stone-600">
            {isClosed ? 'Closed on' : 'Deadline'} {formatDate(opportunity.deadline)}
          </p>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium text-stone-500">Location</dt>
            <dd className="text-sm">{opportunity.location}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-stone-500">Posted</dt>
            <dd className="text-sm">{formatDate(opportunity.postedAt)}</dd>
          </div>
          {opportunity.stipend && (
            <div>
              <dt className="text-xs font-medium text-stone-500">Stipend / reward</dt>
              <dd className="text-sm">{opportunity.stipend}</dd>
            </div>
          )}
        </dl>

        <h2 className="mt-6 text-lg font-semibold">About</h2>
        <p className="mt-2 leading-relaxed text-stone-700">{opportunity.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={apply} disabled={isClosed} aria-describedby={isClosed ? 'apply-closed-reason' : undefined}>
            Apply
          </Button>
          <Button variant="secondary" onClick={toggleSaved} aria-pressed={isSaved}>
            {isSaved ? (
              <BookmarkCheck size={16} aria-hidden="true" />
            ) : (
              <Bookmark size={16} aria-hidden="true" />
            )}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <CopyButton />
        </div>
        {isClosed && (
          <p id="apply-closed-reason" className="mt-3 text-sm text-stone-600">
            Applications closed on {formatDate(opportunity.deadline)}.
          </p>
        )}
      </article>
    </section>
  )
}
