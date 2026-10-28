import { formatDate } from '../../utils/dates'
import SeriesSwatch from './SeriesSwatch'

// Recharts passes active and payload. Shows the date (for time charts) and each value.
export default function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const date = payload[0].payload.date

  return (
    <div className="rounded-card border border-line bg-surface px-3 py-2 text-[13px] text-ink shadow-float">
      {date && <p className="font-semibold">{formatDate(date)}</p>}
      <ul className={date ? 'mt-1 space-y-0.5' : ''}>
        {payload.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <SeriesSwatch color={item.color ?? item.payload.fill} />
            <span className="text-muted">{item.name}</span>
            <span className="ml-auto pl-3 font-semibold tabular-nums">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
