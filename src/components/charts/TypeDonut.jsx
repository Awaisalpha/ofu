import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { typeStyles } from '../opportunity/typeStyles'
import ChartDataTable from './ChartDataTable'
import ChartTooltip from './ChartTooltip'
import { typeChartColors } from './chartColors'

// A ring of opportunity types with a legend that names each type and its count,
// so no slice relies on colour alone. data is [{ type, count }].
// animate={false} draws it straight away, e.g. in the landing page tour.
export default function TypeDonut({ data, summary, title, animate = true }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isAnimationActive = animate && !prefersReducedMotion
  const total = data.reduce((sum, { count }) => sum + count, 0)

  return (
    <figure aria-label={summary} className="m-0 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
      <div className="relative size-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip />} isAnimationActive={isAnimationActive} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              innerRadius="62%"
              outerRadius="100%"
              stroke="var(--color-surface)"
              strokeWidth={2}
              isAnimationActive={isAnimationActive}
            >
              {data.map(({ type }) => (
                <Cell key={type} fill={typeChartColors[type]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="text-2xl leading-none font-semibold tabular-nums">{total}</span>
          <span className="mt-1 text-xs text-muted">approved</span>
        </p>
      </div>

      <ul aria-label="Legend" className="w-full space-y-2 text-sm">
        {data.map(({ type, count }) => {
          const Icon = typeStyles[type].icon
          return (
            <li key={type} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ background: typeChartColors[type] }} />
              <Icon size={16} aria-hidden="true" className="shrink-0 text-muted" />
              <span className="font-medium">{type}</span>
              <span className="ml-auto text-muted tabular-nums">{count}</span>
            </li>
          )
        })}
      </ul>

      <ChartDataTable
        caption={title}
        columns={[
          { key: 'type', label: 'Type' },
          { key: 'count', label: 'Opportunities' },
        ]}
        rows={data}
      />
    </figure>
  )
}
