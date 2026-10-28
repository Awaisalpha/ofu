import { useId } from 'react'
import Tooltip from '../ui/Tooltip'

// An on/off switch for a user's account. The 40px button around the small track
// keeps the click area comfortable. The admin's own switch stays focusable
// (aria-disabled, no onClick) so the tooltip can explain why it is locked.
export default function ActiveSwitch({ user, isCurrentAdmin, onToggle }) {
  const reasonId = useId()

  const switchButton = (
    <button
      type="button"
      role="switch"
      aria-checked={user.isActive}
      aria-label={`Active, ${user.name}`}
      aria-disabled={isCurrentAdmin || undefined}
      aria-describedby={isCurrentAdmin ? reasonId : undefined}
      onClick={isCurrentAdmin ? undefined : () => onToggle(user)}
      className="grid h-10 w-12 shrink-0 place-items-center rounded-card focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent aria-disabled:cursor-not-allowed"
    >
      <span
        aria-hidden="true"
        className={`flex h-5 w-9 items-center rounded-full p-0.5 motion-safe:transition-colors ${
          user.isActive ? 'bg-accent' : 'bg-line-strong'
        } ${isCurrentAdmin ? 'opacity-50' : ''}`}
      >
        <span
          className={`size-4 rounded-full bg-white shadow-sm motion-safe:transition-transform ${
            user.isActive ? 'translate-x-4' : ''
          }`}
        />
      </span>
    </button>
  )

  if (!isCurrentAdmin) return switchButton

  return (
    <Tooltip id={reasonId} text="You cannot deactivate your own account">
      {switchButton}
    </Tooltip>
  )
}
