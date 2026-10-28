const MS_PER_DAY = 24 * 60 * 60 * 1000
const CLOSING_SOON_DAYS = 3

// Turns a day offset (e.g. +10, -3) into a "YYYY-MM-DD" date relative to today.
export function dateFromToday(offsetDays) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// "YYYY-MM-DD" is read as a local date; new Date("YYYY-MM-DD") would use UTC
// and can land on the previous day in Pakistan time.
function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Whole days from today until the deadline: 0 means it closes today, negative means closed.
export function daysLeft(deadline) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((parseDate(deadline) - today) / MS_PER_DAY)
}

export function getDeadlineStatus(deadline) {
  const days = daysLeft(deadline)
  if (days < 0) return 'closed'
  if (days <= CLOSING_SOON_DAYS) return 'closing-soon'
  return 'open'
}

export function describeDaysLeft(deadline) {
  const days = daysLeft(deadline)
  if (days < 0) return 'Closed'
  if (days === 0) return 'Last day'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

// "today", "yesterday", "6 days ago"
export function describePostedAgo(postedAt) {
  return relativeTimeFormatter.format(daysLeft(postedAt), 'day')
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatDate(dateString) {
  return dateFormatter.format(parseDate(dateString))
}

// "Wednesday, 28 October 2026", for page headers.
const longDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatLongDate(date) {
  return longDateFormatter.format(date)
}
