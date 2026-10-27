import { FileText, ListFilter } from 'lucide-react'
import { useSearchParams } from 'react-router'
import ApplicationRow from '../../components/opportunity/ApplicationRow'
import Button from '../../components/ui/Button'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import { useApp } from '../../store/AppContext'
import { getStudentApplications } from '../../store/reducer'

const STATUS_FILTERS = ['All', 'Submitted', 'Accepted', 'Rejected']

export default function MyApplications() {
  const { state } = useApp()

  // The filter lives in the URL, like on Browse, so going back keeps it.
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFilter = searchParams.get('status') ?? 'All'

  function changeFilter(status) {
    setSearchParams(status === 'All' ? {} : { status }, { replace: true })
  }

  // Newest first. Each application is paired with its opportunity for the title and organisation.
  const applications = getStudentApplications(state)
    .map((application) => ({
      application,
      opportunity: state.opportunities.find((opportunity) => opportunity.id === application.opportunityId),
    }))
    .filter(({ opportunity }) => opportunity)
    .sort((a, b) => b.application.appliedAt.localeCompare(a.application.appliedAt))

  function countFor(status) {
    if (status === 'All') return applications.length
    return applications.filter(({ application }) => application.status === status).length
  }

  const visibleApplications =
    statusFilter === 'All'
      ? applications
      : applications.filter(({ application }) => application.status === statusFilter)

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">
        My applications <span className="font-normal text-muted tabular-nums">({applications.length})</span>
      </h1>

      {applications.length === 0 ? (
        <div className="mt-5">
          <EmptyState icon={FileText} message="You haven't applied to anything yet">
            <ButtonLink to="/student/browse">Browse opportunities</ButtonLink>
          </EmptyState>
        </div>
      ) : (
        <>
          <div role="group" aria-label="Filter by status" className="mt-4 flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((status) => {
              const isActive = status === statusFilter
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => changeFilter(status)}
                  aria-pressed={isActive}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isActive
                      ? 'border-accent bg-accent-soft text-accent-strong'
                      : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {status}
                  <span className="text-xs tabular-nums">{countFor(status)}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-4">
            {visibleApplications.length === 0 ? (
              <EmptyState icon={ListFilter} message={`No ${statusFilter.toLowerCase()} applications`}>
                <Button variant="secondary" onClick={() => changeFilter('All')}>
                  Show all
                </Button>
              </EmptyState>
            ) : (
              <ul className="space-y-2 sm:space-y-0 sm:divide-y sm:divide-line sm:overflow-hidden sm:rounded-card sm:border sm:border-line sm:bg-surface">
                {visibleApplications.map(({ application, opportunity }) => (
                  <li key={application.id}>
                    <ApplicationRow application={application} opportunity={opportunity} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  )
}
