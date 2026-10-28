import Button from '../ui/Button'

// Deactivate or Activate. The admin's own account can't be deactivated, so the
// button stays focusable (aria-disabled, no onClick) and the reason is written beside it.
export default function UserStatusButton({ user, isCurrentAdmin, onToggle, className = '' }) {
  const label = user.isActive ? 'Deactivate' : 'Activate'

  if (isCurrentAdmin) {
    const reasonId = `own-account-reason-${user.id}`
    return (
      <div className={className}>
        <Button variant="secondary" aria-disabled="true" aria-describedby={reasonId} className="w-full text-muted">
          {label}
        </Button>
        <p id={reasonId} className="mt-1 text-xs leading-4 text-muted">
          You cannot deactivate your own account
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <Button variant="secondary" onClick={() => onToggle(user)} aria-label={`${label} ${user.name}`} className="w-full">
        {label}
      </Button>
    </div>
  )
}
