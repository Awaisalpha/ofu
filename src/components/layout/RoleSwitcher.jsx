import { RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useApp } from '../../store/AppContext'
import { roleHomePaths, roleLabels } from './navItems'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// "View as" segmented control plus the Reset demo data button.
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
      <div role="group" aria-labelledby="view-as-label" className="flex rounded-card border border-line bg-canvas p-0.5">
        {Object.keys(roleLabels).map((roleKey) => (
          <button
            key={roleKey}
            type="button"
            onClick={() => switchRole(roleKey)}
            aria-pressed={roleKey === role}
            className={`rounded px-2.5 py-1 text-sm ${focusRing} ${
              roleKey === role
                ? 'bg-surface font-semibold text-accent shadow-[0_0_0_1px_var(--color-line)]'
                : 'font-medium text-muted hover:text-ink'
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
        className={`grid size-8 place-items-center rounded-card text-muted hover:bg-canvas hover:text-ink ${focusRing}`}
      >
        <RotateCcw size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
