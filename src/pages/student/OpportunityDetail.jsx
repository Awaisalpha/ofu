import { ArrowLeft, Banknote, Bookmark, BookmarkCheck, CalendarClock, FileQuestion, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router'
import DeadlineBadge from '../../components/opportunity/DeadlineBadge'
import ExpandableText from '../../components/opportunity/ExpandableText'
import OpportunityDetailSkeleton from '../../components/opportunity/OpportunityDetailSkeleton'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'
import EmptyState from '../../components/ui/EmptyState'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../store/ToastContext'
import { describeDaysLeft, formatDate, getDeadlineStatus } from '../../utils/dates'

function Fact({ icon: Icon, label, children }) {
  return (
    <div className="px-5 py-3 sm:px-6">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <Icon size={13} aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold">{children}</dd>
    </div>
  )
}

export default function OpportunityDetail() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const isLoading = useSimulatedLoading()

  // Students only ever see approved opportunities, even with a direct link.
  const opportunity = state.opportunities.find((item) => item.id === id && item.status === 'approved')

  const backLink = (
    <Link
      to="/student/browse"
      className="inline-flex items-center gap-1 rounded text-sm font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <ArrowLeft size={15} aria-hidden="true" />
      Back to opportunities
    </Link>
  )

  if (isLoading) {
    return (
      <section className="mx-auto max-w-[800px]">
        {backLink}
        <div className="mt-3">
          <OpportunityDetailSkeleton />
        </div>
      </section>
    )
  }

  if (!opportunity) {
    return (
      <section className="mx-auto max-w-[800px]">
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
    <section className="mx-auto max-w-[800px]">
      {backLink}

      <article className="mt-3 rounded-card border border-line bg-surface">
        <header className="p-5 sm:p-6">
          <div className="flex min-h-5 flex-wrap items-center gap-2">
            <Badge>{opportunity.type}</Badge>
            <DeadlineBadge deadline={opportunity.deadline} />
          </div>
          <h1 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance">{opportunity.title}</h1>
          <p className="mt-1 text-sm font-medium text-muted">{opportunity.organisation}</p>
        </header>

        <dl className="grid divide-y divide-line border-y border-line bg-canvas sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Fact icon={MapPin} label="Location">
            {opportunity.location}
          </Fact>
          <Fact icon={CalendarClock} label={isClosed ? 'Closed on' : 'Deadline'}>
            {formatDate(opportunity.deadline)}
            <span className="ml-1.5 font-normal text-muted">· {describeDaysLeft(opportunity.deadline)}</span>
          </Fact>
          {opportunity.stipend && (
            <Fact icon={Banknote} label="Stipend / reward">
              {opportunity.stipend}
            </Fact>
          )}
        </dl>

        <div className="p-5 sm:p-6">
          <h2 className="text-sm font-semibold">Description</h2>
          <div className="mt-1.5">
            <ExpandableText key={opportunity.id} id="opportunity-description" text={opportunity.description} />
          </div>
          <p className="mt-4 text-xs text-muted">Posted {formatDate(opportunity.postedAt)}</p>
        </div>

        <footer className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-sm">
            <p className="text-muted">
              {isClosed ? 'Closed on' : 'Apply by'}{' '}
              <span className="font-semibold text-ink">{formatDate(opportunity.deadline)}</span>
            </p>
            {isClosed && (
              <p id="apply-closed-reason" className="mt-0.5 text-xs text-muted">
                Applications for this opportunity are closed.
              </p>
            )}
          </div>

          {/* On mobile the buttons stack full width with Apply first. */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" onClick={toggleSaved} aria-pressed={isSaved}>
              {isSaved ? <BookmarkCheck size={15} aria-hidden="true" /> : <Bookmark size={15} aria-hidden="true" />}
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <CopyButton />
            <Button
              onClick={apply}
              disabled={isClosed}
              aria-describedby={isClosed ? 'apply-closed-reason' : undefined}
              className="max-sm:order-first"
            >
              Apply
            </Button>
          </div>
        </footer>
      </article>
    </section>
  )
}
