import { applications } from '../data/applications'
import { opportunities, savedOpportunityIds } from '../data/opportunities'
import { CURRENT_ALUMNI_ID, CURRENT_STUDENT_ID, users } from '../data/users'
import { dateFromToday } from '../utils/dates'

export function getStudentApplications(state) {
  return state.applications.filter((application) => application.studentId === CURRENT_STUDENT_ID)
}

export function getAlumniPosts(state) {
  return state.opportunities.filter((opportunity) => opportunity.postedBy === CURRENT_ALUMNI_ID)
}

// Applications sent to any of the demo alumnus's posts.
export function getAlumniApplications(state) {
  const postIds = getAlumniPosts(state).map((post) => post.id)
  return state.applications.filter((application) => postIds.includes(application.opportunityId))
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

    // Accept, Reject, and their Undo (back to Submitted).
    case 'SET_APPLICATION_STATUS':
      return {
        ...state,
        applications: state.applications.map((application) =>
          application.id === action.id ? { ...application, status: action.status } : application,
        ),
      }

    // Posts can be withdrawn, so numbering by count could reuse an id; the time can't.
    case 'ADD_OPPORTUNITY':
      return {
        ...state,
        opportunities: [...state.opportunities, { ...action.opportunity, id: `opp-${Date.now()}` }],
      }

    case 'WITHDRAW_OPPORTUNITY':
      return { ...state, opportunities: state.opportunities.filter((opportunity) => opportunity.id !== action.id) }

    // Undo for a withdraw: puts the same post back.
    case 'RESTORE_OPPORTUNITY':
      return { ...state, opportunities: [...state.opportunities, action.opportunity] }

    default:
      return state
  }
}
