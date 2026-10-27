import { CalendarClock } from 'lucide-react'
import { useApp } from '../../store/AppContext'
import { isLiveOpportunity, sortOpportunities } from '../../utils/filters'
import OpportunityCard from '../opportunity/OpportunityCard'
import ArrowLink from '../ui/ArrowLink'
import EmptyState from '../ui/EmptyState'
import SectionHeading from './SectionHeading'

const CARD_COUNT = 3

// The three open opportunities with the nearest deadlines, read live from the store.
export default function ClosingSoon() {
  const { state } = useApp()
  const closingOpportunities = sortOpportunities(
    state.opportunities.filter(isLiveOpportunity),
    'closing-soonest',
  ).slice(0, CARD_COUNT)

  return (
    <section id="closing-soon" aria-labelledby="closing-soon-heading" className="scroll-mt-20">
      <SectionHeading id="closing-soon-heading" title="Closing this week" intro="Don’t let these slip past." />

      {closingOpportunities.length === 0 ? (
        <div className="mt-8">
          <EmptyState icon={CalendarClock} message="Nothing is closing soon right now.">
            <ArrowLink to="/student/browse">Browse opportunities</ArrowLink>
          </EmptyState>
        </div>
      ) : (
        <>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {closingOpportunities.map((opportunity) => (
              <li key={opportunity.id}>
                <OpportunityCard opportunity={opportunity} headingLevel={3} />
              </li>
            ))}
          </ul>
          <ArrowLink to="/student/browse?sort=closing-soonest" className="mt-4">
            See all closing soon
          </ArrowLink>
        </>
      )}
    </section>
  )
}
