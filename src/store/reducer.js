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

export function getUserName(state, userId) {
  return state.users.find((user) => user.id === userId)?.name ?? 'Unknown user'
}

// The admin review queue, oldest first. The sort is stable, so posts from the
// same day stay in the order they were added.
export function getPendingPosts(state) {
  return state.opportunities
    .filter((opportunity) => opportunity.status === 'pending')
    .sort((a, b) => a.postedAt.localeCompare(b.postedAt))
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
    applications: applications.map(({ appliedOffsetDays, decidedOffsetDays, ...application }) => ({
      ...application,
      appliedAt: dateFromToday(appliedOffsetDays),
      decidedAt: decidedOffsetDays === undefined ? '' : dateFromToday(decidedOffsetDays),
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

    // Accept, Reject, and their Undo (back to Submitted, which clears the decision date).
    case 'SET_APPLICATION_STATUS':
      return {
        ...state,
        applications: state.applications.map((application) =>
          application.id === action.id
            ? {
                ...application,
                status: action.status,
                decidedAt: action.status === 'Submitted' ? '' : dateFromToday(0),
              }
            : application,
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

    // Approve, Reject, and their Undo (back to pending with no reason).
    case 'SET_OPPORTUNITY_STATUS':
      return {
        ...state,
        opportunities: state.opportunities.map((opportunity) =>
          opportunity.id === action.id
            ? { ...opportunity, status: action.status, rejectReason: action.rejectReason ?? '' }
            : opportunity,
        ),
      }

    // Activate, Deactivate, and their Undo.
    case 'SET_USER_ACTIVE':
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.id ? { ...user, isActive: action.isActive } : user)),
      }

    default:
      return state
  }
}
