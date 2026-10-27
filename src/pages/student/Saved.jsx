import { Bookmark } from 'lucide-react'
import OpportunityCard from '../../components/opportunity/OpportunityCard'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import { useApp } from '../../store/AppContext'
import { sortOpportunities } from '../../utils/filters'

export default function Saved() {
  const { state } = useApp()

  // Closing soonest puts closed ones last; the card mutes them and shows the Closed badge.
  const savedOpportunities = sortOpportunities(
    state.opportunities.filter(
      (opportunity) => opportunity.status === 'approved' && state.savedOpportunityIds.includes(opportunity.id),
    ),
    'closing-soonest',
  )

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">
        Saved <span className="font-normal text-muted tabular-nums">({savedOpportunities.length})</span>
      </h1>
      <p className="mt-1 text-sm text-muted">Sorted by the closest deadline.</p>

      <div className="mt-5">
        {savedOpportunities.length === 0 ? (
          <EmptyState icon={Bookmark} message="No saved opportunities yet">
            <ButtonLink to="/student/browse">Browse opportunities</ButtonLink>
          </EmptyState>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {savedOpportunities.map((opportunity) => (
              <li key={opportunity.id}>
                <OpportunityCard opportunity={opportunity} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
