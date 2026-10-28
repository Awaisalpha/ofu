import { Briefcase, ChartLine, ClipboardCheck, FileText, Users } from 'lucide-react'
import { useRef } from 'react'
import TrendLabel from './TrendLabel'

// Same icons as the admin and student navigation.
const metricIcons = {
  users: Users,
  live: Briefcase,
  pending: ClipboardCheck,
  applications: FileText,
}

// Each metric's own colour, written out in full so Tailwind finds the class names.
// The chart below uses the same colours, from metricChartColors.
const metricStyles = {
  users: {
    card: 'border-metric-users-line bg-metric-users-soft',
    badge: 'bg-metric-users-strong',
    text: 'text-metric-users-strong',
    ring: 'ring-metric-users-strong',
  },
  live: {
    card: 'border-metric-live-line bg-metric-live-soft',
    badge: 'bg-metric-live-strong',
    text: 'text-metric-live-strong',
    ring: 'ring-metric-live-strong',
  },
  pending: {
    card: 'border-metric-pending-line bg-metric-pending-soft',
    badge: 'bg-metric-pending-strong',
    text: 'text-metric-pending-strong',
    ring: 'ring-metric-pending-strong',
  },
  applications: {
    card: 'border-metric-applications-line bg-metric-applications-soft',
    badge: 'bg-metric-applications-strong',
    text: 'text-metric-applications-strong',
    ring: 'ring-metric-applications-strong',
  },
}

const nextIndexByKey = {
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (index, count) => count - 1,
}

// The four metric cards as tabs that choose what the chart below shows.
// Roving tabindex: Tab enters on the selected card, arrow keys, Home and End move between cards.
export default function MetricTabs({ metrics, selectedId, onSelect, panelId }) {
  const tabRefs = useRef([])

  function handleKeyDown(event, index) {
    const getNextIndex = nextIndexByKey[event.key]
    if (!getNextIndex) return
    event.preventDefault()
    const nextIndex = getNextIndex(index, metrics.length)
    onSelect(metrics[nextIndex].id)
    tabRefs.current[nextIndex].focus()
  }

  return (
    <div role="tablist" aria-label="Metric to chart" className="grid auto-rows-fr grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const isSelected = metric.id === selectedId
        const Icon = metricIcons[metric.id]
        const styles = metricStyles[metric.id]
        return (
          <button
            key={metric.id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`metric-tab-${metric.id}`}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(metric.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            // The hover lift uses translate, so the layout never moves.
            className={`relative flex h-full min-w-0 flex-col items-start overflow-hidden rounded-card border p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-[translate,box-shadow] motion-safe:duration-150 motion-safe:hover:-translate-y-0.5 ${styles.card} ${
              isSelected ? `shadow-float ring-2 ${styles.ring}` : 'hover:shadow-card-hover'
            }`}
          >
            {/* Decoration only, behind the content. */}
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              className={`absolute -right-2 -bottom-2 size-14 opacity-10 sm:size-20 ${styles.text}`}
            />

            <span
              aria-hidden="true"
              className={`grid size-9 shrink-0 place-items-center rounded-full text-on-accent sm:size-10 ${styles.badge}`}
            >
              <Icon size={20} />
            </span>

            <span className="relative mt-3 text-[28px] leading-none font-bold tracking-tight tabular-nums sm:text-3xl">
              {metric.value}
            </span>
            <span className="relative mt-1.5 text-[13px] leading-5 font-medium text-ink">{metric.label}</span>

            <span className="relative mt-2.5">
              <TrendLabel trend={metric.trend} />
            </span>

            {/* Always there, only visible when selected, so switching cards never changes their height. */}
            <span
              className={`relative mt-auto flex items-center gap-1 pt-3 text-xs leading-4 font-semibold ${styles.text} ${
                isSelected ? '' : 'invisible'
              }`}
            >
              <ChartLine size={14} aria-hidden="true" />
              Showing in chart
            </span>
          </button>
        )
      })}
    </div>
  )
}
