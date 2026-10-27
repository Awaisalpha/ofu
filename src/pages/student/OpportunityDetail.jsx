import { ArrowLeft, Banknote, Bookmark, BookmarkCheck, CalendarClock, Check, FileQuestion, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ApplyForm from '../../components/opportunity/ApplyForm'
import DeadlineBadge from '../../components/opportunity/DeadlineBadge'
import ExpandableText from '../../components/opportunity/ExpandableText'
import OpportunityDetailSkeleton from '../../components/opportunity/OpportunityDetailSkeleton'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'
import Dialog from '../../components/ui/Dialog'
import EmptyState from '../../components/ui/EmptyState'
import { CURRENT_STUDENT_ID } from '../../data/users'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { useToggleSaved } from '../../hooks/useToggleSaved'
import { useApp } from '../../store/AppContext'
import { getStudentApplications } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'
import { dateFromToday, describeDaysLeft, formatDate, getDeadlineStatus } from '../../utils/dates'

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
  const toggleSaved = useToggleSaved()
  const navigate = useNavigate()
  const isLoading = useSimulatedLoading()
  const [isApplyOpen, setIsApplyOpen] = useState(false)

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
  const hasApplied = getStudentApplications(state).some((application) => application.opportunityId === opportunity.id)

  function submitApplication({ coverNote, portfolioUrl }) {
    dispatch({
      type: 'ADD_APPLICATION',
      application: {
        opportunityId: opportunity.id,
        studentId: CURRENT_STUDENT_ID,
        coverNote,
        portfolioUrl,
        status: 'Submitted',
        appliedAt: dateFromToday(0),
      },
    })
    setIsApplyOpen(false)
    showToast({
      message: 'Application sent',
      actionLabel: 'View',
      onAction: () => navigate('/student/applications'),
    })
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
            {hasApplied ? (
              <p id="apply-done-reason" className="mt-0.5 text-xs text-muted">
                You've already applied.{' '}
                <Link
                  to="/student/applications"
                  className="rounded font-medium text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  See your applications
                </Link>
              </p>
            ) : (
              isClosed && (
                <p id="apply-closed-reason" className="mt-0.5 text-xs text-muted">
                  Applications for this opportunity are closed.
                </p>
              )
            )}
          </div>

          {/* On mobile the buttons stack full width with Apply first. */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" onClick={() => toggleSaved(opportunity.id)} aria-pressed={isSaved}>
              {isSaved ? <BookmarkCheck size={15} aria-hidden="true" /> : <Bookmark size={15} aria-hidden="true" />}
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <CopyButton />
            {hasApplied ? (
              // aria-disabled (not disabled) keeps it focusable, so focus can land here when the dialog closes.
              <Button aria-disabled="true" aria-describedby="apply-done-reason" className="max-sm:order-first">
                <Check size={15} aria-hidden="true" />
                Applied
              </Button>
            ) : (
              <Button
                onClick={() => setIsApplyOpen(true)}
                disabled={isClosed}
                aria-describedby={isClosed ? 'apply-closed-reason' : undefined}
                className="max-sm:order-first"
              >
                Apply
              </Button>
            )}
          </div>
        </footer>
      </article>

      <Dialog
        open={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        title={`Apply to ${opportunity.title}`}
        description={opportunity.organisation}
      >
        <ApplyForm onSubmit={submitApplication} onCancel={() => setIsApplyOpen(false)} />
      </Dialog>
    </section>
  )
}
