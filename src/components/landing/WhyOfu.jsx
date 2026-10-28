import { ArrowRight, ClipboardList, Mail, MessageCircle, Pin } from 'lucide-react'
import { Link } from 'react-router'
import { useApp } from '../../store/AppContext'
import { isLiveOpportunity, sortOpportunities } from '../../utils/filters'
import DeadlineBadge from '../opportunity/DeadlineBadge'
import { typeStyles } from '../opportunity/typeStyles'
import ArrowLink from '../ui/ArrowLink'
import SectionHeading from './SectionHeading'
import SourceLabel from './SourceLabel'

const ROW_COUNT = 3

// Left: how posts look today. Right: the same kind of posts in OFU, read live from the store.
// The scraps only tilt from 768px up, so they never push past the edge on a phone.
// grid-cols-1 stops the truncated email line from widening the column on a phone.
export default function WhyOfu() {
  const { state } = useApp()
  const rows = sortOpportunities(state.opportunities.filter(isLiveOpportunity), 'closing-soonest').slice(0, ROW_COUNT)

  return (
    <section id="why-ofu" aria-labelledby="why-ofu-heading" className="scroll-mt-20">
      <SectionHeading
        id="why-ofu-heading"
        label="Why OFU"
        title="From scattered posts to one verified place"
        intro="Students should not have to dig through five apps to find one internship."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
        <div className="rounded-card bg-closed-soft p-5 sm:p-6">
          <h3 className="text-lg leading-snug font-semibold">Without OFU</h3>
          <ul className="mt-5 flex flex-col gap-4">
            <li className="max-w-80 rounded-2xl rounded-bl-sm bg-surface px-4 py-3 shadow-card-hover md:-rotate-1">
              <p className="text-sm text-pretty">Internship at a design studio, deadline was yesterday</p>
              <SourceLabel icon={MessageCircle}>WhatsApp group</SourceLabel>
            </li>
            <li className="rounded-card border border-line bg-surface px-4 py-3 shadow-card-hover md:ml-6 md:rotate-[1.5deg]">
              <p className="truncate text-sm font-semibold">Fwd: Fwd: scholarship forms</p>
              <p className="truncate text-sm text-muted">Please see the attachment and submit before…</p>
              <SourceLabel icon={Mail}>Email</SourceLabel>
            </li>
            <li className="relative max-w-72 rounded-sm bg-surface px-4 pt-5 pb-3 shadow-card-hover md:ml-2 md:-rotate-2">
              <Pin size={16} aria-hidden="true" className="absolute -top-2 left-1/2 -translate-x-1/2 text-danger" />
              <p className="text-sm text-pretty">Campus career fair, ask the office for details</p>
              <SourceLabel icon={ClipboardList}>Notice board</SourceLabel>
            </li>
          </ul>
        </div>

        <div aria-hidden="true" className="hidden place-items-center md:grid">
          <span className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted">
            <ArrowRight size={18} />
          </span>
        </div>

        <div className="flex flex-col rounded-card border-2 border-accent bg-surface p-5 sm:p-6">
          <h3 className="text-lg leading-snug font-semibold">With OFU</h3>
          {rows.length === 0 ? (
            <div className="mt-5">
              <p className="text-sm text-muted">No open opportunities right now.</p>
              <ArrowLink to="/student/browse">Browse opportunities</ArrowLink>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-line">
              {rows.map((opportunity) => {
                const { icon: TypeIcon, tintClassName } = typeStyles[opportunity.type]
                return (
                  <li key={opportunity.id}>
                    <Link
                      to={`/student/opportunities/${opportunity.id}`}
                      className="-mx-2 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 rounded-card px-2 py-3 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:grid-cols-[auto_minmax(0,1fr)_auto]"
                    >
                      <span className={`grid size-9 place-items-center rounded-card ${tintClassName}`}>
                        <TypeIcon size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span title={opportunity.title} className="block truncate text-sm font-semibold">
                          {opportunity.title}
                        </span>
                        <span className="block text-xs leading-5 text-muted">{opportunity.type}</span>
                      </span>
                      {/* On phones the badge drops under the title so the title keeps its width. */}
                      <span className="col-start-2 sm:col-start-auto">
                        <DeadlineBadge deadline={opportunity.deadline} />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          {rows.length > 0 && (
            <ArrowLink to="/student/browse" className="mt-auto self-start pt-3">
              Browse all opportunities
            </ArrowLink>
          )}
        </div>
      </div>
    </section>
  )
}
