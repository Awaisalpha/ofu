import { useState } from 'react'
import MetricTabs from '../../components/admin/MetricTabs'
import RangeSelect from '../../components/admin/RangeSelect'
import WaitingForReview from '../../components/admin/WaitingForReview'
import AreaTrendChart from '../../components/charts/AreaTrendChart'
import { metricChartColors } from '../../components/charts/chartColors'
import TypeDonut from '../../components/charts/TypeDonut'
import { useApp } from '../../store/AppContext'
import { formatLongDate } from '../../utils/dates'
import { countByType, describeTypeCounts, getOldestPending, getOverviewMetrics } from '../../utils/stats'

const PANEL_ID = 'metric-panel'

// The stat cards are tabs, and one large chart shows the chosen metric per day.
// preview is the landing page tour: the charts appear without animating.
export default function Overview({ preview = false }) {
  const { state } = useApp()
  const [selectedId, setSelectedId] = useState('applications')
  const [days, setDays] = useState(30)

  const metrics = getOverviewMetrics(state, days)
  const selected = metrics.find((metric) => metric.id === selectedId)
  const approved = state.opportunities.filter((opportunity) => opportunity.status === 'approved')
  const typeCounts = countByType(approved)

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-muted">{formatLongDate(new Date())}</p>

      <div className="mt-5">
        <MetricTabs metrics={metrics} selectedId={selectedId} onSelect={setSelectedId} panelId={PANEL_ID} />
      </div>

      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={`metric-tab-${selected.id}`}
        className="mt-4 min-w-0 rounded-card border border-line bg-surface p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base leading-snug font-semibold">{selected.seriesName}</h2>
            <p className="mt-0.5 text-[13px] text-muted">
              {selected.isRunningTotal ? 'Running total' : 'Per day'}, last {days} days
            </p>
          </div>
          <RangeSelect id="trend-range" value={days} onChange={setDays} />
        </div>
        <div className="mt-4">
          <AreaTrendChart
            data={selected.series}
            name={selected.seriesName}
            summary={selected.summary}
            title={`${selected.seriesName}, last ${days} days`}
            color={metricChartColors[selected.id]}
            animate={!preview}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section
          aria-labelledby="type-donut-title"
          className="min-w-0 rounded-card border border-line bg-surface p-4 sm:p-5"
        >
          <h2 id="type-donut-title" className="text-base leading-snug font-semibold">
            Opportunities by type
          </h2>
          <p className="mt-0.5 text-[13px] text-muted">Approved posts, open and closed</p>
          <div className="mt-4">
            <TypeDonut
              data={typeCounts}
              summary={`Approved opportunities by type: ${describeTypeCounts(typeCounts)}.`}
              title="Approved opportunities by type"
              animate={!preview}
            />
          </div>
        </section>
        <WaitingForReview posts={getOldestPending(state, 3)} />
      </div>
    </section>
  )
}
