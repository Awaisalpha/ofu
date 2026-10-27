import { daysLeft, getDeadlineStatus } from './dates'

// Approved and still open: what a student can apply to right now.
export function isLiveOpportunity(opportunity) {
  return opportunity.status === 'approved' && getDeadlineStatus(opportunity.deadline) !== 'closed'
}

export function filterOpportunities(opportunities, { searchText, type }) {
  const search = searchText.trim().toLowerCase()

  return opportunities.filter((opportunity) => {
    const matchesType = type === 'All' || opportunity.type === type
    const matchesSearch =
      opportunity.title.toLowerCase().includes(search) ||
      opportunity.organisation.toLowerCase().includes(search)
    return matchesType && matchesSearch
  })
}

export function sortOpportunities(opportunities, sortBy) {
  const sorted = [...opportunities]

  if (sortBy === 'newest') {
    // "YYYY-MM-DD" strings sort correctly as plain text.
    return sorted.sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  }

  // Closing soonest: open ones by deadline first, closed ones at the end.
  return sorted.sort((a, b) => {
    const aClosed = daysLeft(a.deadline) < 0
    const bClosed = daysLeft(b.deadline) < 0
    if (aClosed !== bClosed) return aClosed ? 1 : -1
    return a.deadline.localeCompare(b.deadline)
  })
}
