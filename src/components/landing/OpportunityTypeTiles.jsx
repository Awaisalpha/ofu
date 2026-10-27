import { Link } from 'react-router'
import { useApp } from '../../store/AppContext'
import { isLiveOpportunity } from '../../utils/filters'
import SectionHeading from './SectionHeading'
import { typeLinks } from './typeLinks'

export default function OpportunityTypeTiles() {
  const { state } = useApp()
  const liveOpportunities = state.opportunities.filter(isLiveOpportunity)

  return (
    <section id="opportunity-types" aria-labelledby="opportunity-types-heading" className="scroll-mt-20">
      <SectionHeading
        id="opportunity-types-heading"
        title="Opportunity types"
        intro="Pick a type to see every verified listing that is still open."
      />

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {typeLinks.map(({ type, label, icon: Icon, to }) => {
          const openCount = liveOpportunities.filter((opportunity) => opportunity.type === type).length
          return (
            <li key={type}>
              <Link
                to={to}
                className="flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-4 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="grid size-10 place-items-center rounded-card bg-accent-soft text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{label}</span>
                  <span className="block text-sm text-muted tabular-nums">{openCount} open</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
