import { opportunityTypes } from '../../data/opportunities'

// One horizontal bar per type. Names and counts are real text and the bars are
// hidden from screen readers, so the chart reads as a plain list.
export default function TypeBarChart({ opportunities }) {
  const counts = opportunityTypes.map((type) => ({
    type,
    count: opportunities.filter((opportunity) => opportunity.type === type).length,
  }))
  // At least 1, so an empty store doesn't divide by zero.
  const largestCount = Math.max(1, ...counts.map(({ count }) => count))

  return (
    <section aria-labelledby="type-chart-title" className="rounded-card border border-line bg-surface p-4 sm:p-5">
      <h2 id="type-chart-title" className="text-base leading-snug font-semibold">
        Opportunities by type
      </h2>
      <p className="mt-0.5 text-[13px] text-muted">Approved posts, open and closed</p>

      <ul aria-label="Approved opportunities by type" className="mt-4 space-y-3">
        {counts.map(({ type, count }) => (
          <li key={type}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{type}</span>
              <span className="text-muted tabular-nums">{count}</span>
            </div>
            <div aria-hidden="true" className="mt-1.5 h-2 rounded-full bg-canvas">
              <div className="h-2 rounded-full bg-accent" style={{ width: `${(count / largestCount) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
