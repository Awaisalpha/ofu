import { applications } from '../data/applications'
import { opportunities, savedOpportunityIds } from '../data/opportunities'
import { users } from '../data/users'
import { dateFromToday } from '../utils/dates'

// Builds fresh demo data, turning the day offsets in the seed files into real dates.
export function createInitialState() {
  return {
    opportunities: opportunities.map(({ deadlineOffsetDays, postedOffsetDays, ...opportunity }) => ({
      ...opportunity,
      deadline: dateFromToday(deadlineOffsetDays),
      postedAt: dateFromToday(postedOffsetDays),
    })),
    users: users.map(({ joinedOffsetDays, ...user }) => ({
      ...user,
      joinedAt: dateFromToday(joinedOffsetDays),
    })),
    applications: applications.map(({ appliedOffsetDays, ...application }) => ({
      ...application,
      appliedAt: dateFromToday(appliedOffsetDays),
    })),
    savedOpportunityIds: [...savedOpportunityIds],
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'RESET_DEMO':
      return createInitialState()

    // Saves or unsaves; dispatching it again is the Undo.
    case 'TOGGLE_SAVED': {
      const isSaved = state.savedOpportunityIds.includes(action.id)
      return {
        ...state,
        savedOpportunityIds: isSaved
          ? state.savedOpportunityIds.filter((id) => id !== action.id)
          : [...state.savedOpportunityIds, action.id],
      }
    }

    default:
      return state
  }
}
