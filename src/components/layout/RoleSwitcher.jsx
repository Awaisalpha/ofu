import { RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useApp } from '../../store/AppContext'
import { roleHomePaths, roleLabels } from './navItems'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// "View as" segmented control on a near-black track, plus the Reset demo data button.
// The before: layers grow the click areas to 40px without changing the look.
export default function RoleSwitcher({ role }) {
  const navigate = useNavigate()
  const { dispatch } = useApp()

  function switchRole(newRole) {
    if (newRole !== role) navigate(roleHomePaths[newRole])
  }

  function resetDemoData() {
    if (window.confirm('Reset all demo data? Your changes will be lost.')) {
      dispatch({ type: 'RESET_DEMO' })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span id="view-as-label" className="hidden text-xs font-medium text-muted sm:inline">
        View as
      </span>
      <div role="group" aria-labelledby="view-as-label" className="flex rounded-card border border-ink bg-ink p-0.5">
        {Object.keys(roleLabels).map((roleKey) => (
          <button
            key={roleKey}
            type="button"
            onClick={() => switchRole(roleKey)}
            aria-pressed={roleKey === role}
            // The accent focus ring is too faint on ink, so these use a white one.
            className={`relative rounded px-2.5 py-1 text-sm before:absolute before:inset-x-0 before:-inset-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface ${
              roleKey === role
                ? 'bg-surface font-semibold text-ink'
                : 'font-medium text-inverse-muted hover:text-surface'
            }`}
          >
            {roleLabels[roleKey]}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={resetDemoData}
        aria-label="Reset demo data"
        title="Reset demo data"
        className={`relative grid size-8 place-items-center rounded-card text-muted before:absolute before:-inset-1 hover:bg-canvas hover:text-ink ${focusRing}`}
      >
        <RotateCcw size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
