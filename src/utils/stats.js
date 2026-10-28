import { opportunityTypes } from '../data/opportunities'
import { getPendingPosts, getUserName } from '../store/reducer'
import { dateFromToday, formatShortDate } from './dates'
import { isLiveOpportunity } from './filters'

// All the shaping for the admin charts lives here, so chart components only get ready arrays.
// Dates are "YYYY-MM-DD" strings, which compare correctly as plain text.

// One entry per day, oldest first, ending today: [{ date, label: '28 Oct', count }]
function countPerDay(items, dateKey, days) {
  const series = []
  for (let offset = 1 - days; offset <= 0; offset++) {
    const date = dateFromToday(offset)
    const count = items.filter((item) => item[dateKey] === date).length
    series.push({ date, label: formatShortDate(date), count })
  }
  return series
}

// Like countPerDay, but each day counts everything up to and including it: [{ date, label, count }]
function countRunningTotal(items, dateKey, days) {
  return countPerDay(items, dateKey, days).map((day) => ({
    ...day,
    count: items.filter((item) => item[dateKey] <= day.date).length,
  }))
}

// The last 7 days against the 7 before them.
// With nothing last week a percentage means nothing, so it reports no change.
function compareWeeks(items, dateKey) {
  const thisWeekStart = dateFromToday(-6)
  const lastWeekStart = dateFromToday(-13)
  const thisWeek = items.filter((item) => item[dateKey] >= thisWeekStart).length
  const lastWeek = items.filter((item) => item[dateKey] >= lastWeekStart && item[dateKey] < thisWeekStart).length
  const difference = thisWeek - lastWeek

  if (lastWeek === 0) return { difference, percent: 0, direction: 'flat' }

  const percent = Math.round((difference / lastWeek) * 100)
  let direction = 'flat'
  if (percent > 0) direction = 'up'
  if (percent < 0) direction = 'down'
  return { difference, percent, direction }
}

// change is "+12%", "−8%" or "No change"; context is "vs last week".
function describePercentTrend({ percent, direction }) {
  if (direction === 'flat') return { direction, change: 'No change', context: 'vs last week' }
  const sign = direction === 'up' ? '+' : '−'
  return { direction, change: `${sign}${Math.abs(percent)}%`, context: 'vs last week' }
}

// change is "Up 2", "Down 1" or "Same"; context is "this week" or "as last week".
function describeCountTrend({ difference }) {
  if (difference > 0) return { direction: 'up', change: `Up ${difference}`, context: 'this week' }
  if (difference < 0) return { direction: 'down', change: `Down ${-difference}`, context: 'this week' }
  return { direction: 'flat', change: 'Same', context: 'as last week' }
}

// A one-sentence summary for a chart's aria-label, e.g.
// "Applications rose from 2 to 5 per day over the last 7 days, 24 in total."
// isRunningTotal drops "per day" and the total, which would be wrong for a running total.
function describeSeries(name, series, days, isRunningTotal) {
  const first = series[0]?.count ?? 0
  const last = series[series.length - 1]?.count ?? 0
  const total = series.reduce((sum, day) => sum + day.count, 0)

  let change = `rose from ${first} to ${last}`
  if (last < first) change = `fell from ${first} to ${last}`
  if (last === first) change = `stayed at ${first}`

  if (isRunningTotal) return `${name} ${change} over the last ${days} days.`
  return `${name} ${change} per day over the last ${days} days, ${total} in total.`
}

// The four headline numbers, each with its series over the range and weekly trend.
export function getOverviewMetrics(state, days) {
  const approved = state.opportunities.filter((opportunity) => opportunity.status === 'approved')

  const metrics = [
    {
      id: 'users',
      label: 'Users',
      // A running total: new sign-ups are 0 or 1 a day, which draws as a jagged line.
      seriesName: 'Total users',
      isRunningTotal: true,
      value: state.users.length,
      items: state.users,
      dateKey: 'joinedAt',
      describeTrend: describePercentTrend,
    },
    {
      id: 'live',
      label: 'Live opportunities',
      seriesName: 'Approved posts',
      value: approved.filter(isLiveOpportunity).length,
      items: approved,
      dateKey: 'postedAt',
      describeTrend: describePercentTrend,
    },
    {
      id: 'pending',
      label: 'Pending review',
      seriesName: 'New posts',
      value: getPendingPosts(state).length,
      items: state.opportunities,
      dateKey: 'postedAt',
      describeTrend: describeCountTrend,
    },
    {
      id: 'applications',
      label: 'Applications',
      seriesName: 'Applications',
      value: state.applications.length,
      items: state.applications,
      dateKey: 'appliedAt',
      describeTrend: describePercentTrend,
    },
  ]

  return metrics.map(({ items, dateKey, describeTrend, isRunningTotal = false, ...metric }) => {
    const series = isRunningTotal ? countRunningTotal(items, dateKey, days) : countPerDay(items, dateKey, days)
    return {
      ...metric,
      isRunningTotal,
      series,
      trend: describeTrend(compareWeeks(items, dateKey)),
      summary: describeSeries(metric.seriesName, series, days, isRunningTotal),
    }
  })
}

// [{ type, count }] in the usual type order.
export function countByType(opportunities) {
  return opportunityTypes.map((type) => ({
    type,
    count: opportunities.filter((opportunity) => opportunity.type === type).length,
  }))
}

// "Job 4, Internship 5, …" for a type chart's aria-label.
export function describeTypeCounts(typeCounts) {
  return typeCounts.map(({ type, count }) => `${type} ${count}`).join(', ')
}

// The oldest pending posts with their poster's name: [{ post, posterName }]
export function getOldestPending(state, count) {
  return getPendingPosts(state)
    .slice(0, count)
    .map((post) => ({ post, posterName: getUserName(state, post.postedBy) }))
}
