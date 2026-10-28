import { useId } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import ChartDataTable from './ChartDataTable'
import ChartTooltip from './ChartTooltip'
import { chartColors } from './chartColors'

const axisTick = { fill: chartColors.axisText, fontSize: 12 }

// One series as a line with a soft fill fading to nothing. data is [{ date, label, count }].
export default function AreaTrendChart({ data, name, summary, title, color = chartColors.primary }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  // useId can contain characters that break url(#...), so keep letters and digits only.
  const gradientId = `area-fill-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <figure aria-label={summary} className="m-0">
      <div className="h-64 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={chartColors.grid} />
            <XAxis
              dataKey="label"
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={24}
              tickMargin={8}
            />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} allowDecimals={false} width={36} />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: chartColors.cursor, strokeDasharray: '3 3' }}
              isAnimationActive={!prefersReducedMotion}
            />
            <Area
              type="monotone"
              dataKey="count"
              name={name}
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              activeDot={{ r: 4, strokeWidth: 0 }}
              isAnimationActive={!prefersReducedMotion}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable
        caption={title}
        columns={[
          { key: 'label', label: 'Day' },
          { key: 'count', label: name },
        ]}
        rows={data}
      />
    </figure>
  )
}
