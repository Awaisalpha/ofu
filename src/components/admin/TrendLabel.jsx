import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'

const trendIcons = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus }

// The change in a pill with an arrow ("+12%"), then its context ("vs last week"),
// so the direction never relies on colour. Up is green; down and flat stay neutral,
// because fewer posts or users isn't an error.
// trend is { direction, change, context } from utils/stats.js.
export default function TrendLabel({ trend }) {
  const Icon = trendIcons[trend.direction]
  const pillClassName = trend.direction === 'up' ? 'bg-open-soft text-open' : 'bg-closed-soft text-closed'

  return (
    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-5">
      <span className={`inline-flex items-center gap-0.5 rounded-full py-px pr-2 pl-1.5 font-semibold ${pillClassName}`}>
        <Icon size={14} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
        {trend.change}
      </span>
      <span className="text-muted">{trend.context}</span>
    </span>
  )
}
