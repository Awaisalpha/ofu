import { CircleCheck, CircleX, FileText, List, ListFilter, Send } from 'lucide-react'
import { useSearchParams } from 'react-router'
import ApplicationRow from '../../components/opportunity/ApplicationRow'
import Button from '../../components/ui/Button'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import StatusFilterChips from '../../components/ui/StatusFilterChips'
import { useApp } from '../../store/AppContext'
import { getStudentApplications } from '../../store/reducer'

// Same icons as ApplicationStatusBadge, so a filter and its badge look alike.
const STATUS_FILTERS = [
  { status: 'All', icon: List },
  { status: 'Submitted', icon: Send },
  { status: 'Accepted', icon: CircleCheck },
  { status: 'Rejected', icon: CircleX },
]

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
          <div className="mt-4">
            <StatusFilterChips
              label="Filter by status"
              options={STATUS_FILTERS.map(({ status, icon }) => ({
                value: status,
                label: status,
                count: countFor(status),
                icon,
              }))}
              selected={statusFilter}
              onSelect={changeFilter}
            />
          </div>

          <div className="mt-4">
            {visibleApplications.length === 0 ? (
              <EmptyState icon={ListFilter} message={`No ${statusFilter.toLowerCase()} applications`}>
                <Button variant="secondary" onClick={() => changeFilter('All')}>
                  Show all
                </Button>
              </EmptyState>
            ) : (
              <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
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
