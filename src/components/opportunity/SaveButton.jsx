import { Bookmark } from 'lucide-react'
import { useToggleSaved } from '../../hooks/useToggleSaved'
import { useApp } from '../../store/AppContext'

// Icon-only save toggle for cards. The label stays the same; aria-pressed tells whether it's saved.
export default function SaveButton({ opportunity }) {
  const { state } = useApp()
  const toggleSaved = useToggleSaved()
  const isSaved = state.savedOpportunityIds.includes(opportunity.id)

  return (
    <button
      type="button"
      onClick={() => toggleSaved(opportunity.id)}
      aria-label={`Save ${opportunity.title}`}
      aria-pressed={isSaved}
      title={isSaved ? 'Saved' : 'Save'}
      className={`grid size-8 place-items-center rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isSaved ? 'text-accent hover:bg-accent-soft' : 'text-muted hover:bg-canvas hover:text-ink'
      }`}
    >
      <Bookmark size={17} className={isSaved ? 'fill-current' : ''} aria-hidden="true" />
    </button>
  )
}
