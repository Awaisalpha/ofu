import { useApp } from '../store/AppContext'
import { useToast } from '../store/ToastContext'

// Save/unsave with a toast. Used by OpportunityCard and OpportunityDetail.
export function useToggleSaved() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()

  return function toggleSaved(opportunityId) {
    const isSaved = state.savedOpportunityIds.includes(opportunityId)
    dispatch({ type: 'TOGGLE_SAVED', id: opportunityId })

    // Only unsaving gets Undo; saving is undone with the same button.
    if (isSaved) {
      showToast({
        message: 'Removed from saved',
        actionLabel: 'Undo',
        onAction: () => dispatch({ type: 'TOGGLE_SAVED', id: opportunityId }),
      })
    } else {
      showToast({ message: 'Saved to your list' })
    }
  }
}
