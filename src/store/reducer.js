import { applications } from '../data/applications'
import { opportunities, savedOpportunityIds } from '../data/opportunities'
import { CURRENT_STUDENT_ID, users } from '../data/users'
import { dateFromToday } from '../utils/dates'

export function getStudentApplications(state) {
  return state.applications.filter((application) => application.studentId === CURRENT_STUDENT_ID)
}

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

    // Ignored if this student already applied, so nobody can apply twice.
    // Applications are never deleted, so numbering by count keeps ids unique.
    case 'ADD_APPLICATION': {
      const { application } = action
      const alreadyApplied = state.applications.some(
        (existing) =>
          existing.studentId === application.studentId && existing.opportunityId === application.opportunityId,
      )
      if (alreadyApplied) return state
      const newApplication = { ...application, id: `app-${state.applications.length + 1}` }
      return { ...state, applications: [...state.applications, newApplication] }
    }

    default:
      return state
  }
}
