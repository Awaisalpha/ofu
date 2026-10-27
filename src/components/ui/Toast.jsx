import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const TOAST_DURATION_MS = 4000

export default function Toast({ toast, onDismiss }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const remainingTimeRef = useRef(TOAST_DURATION_MS)
  const isPaused = isHovered || isFocused

  // Runs the timer while not paused. The cleanup stores how much time was left,
  // so after a pause the toast only waits for the remaining time.
  useEffect(() => {
    if (isPaused) return

    const startedAt = Date.now()
    const timeoutId = setTimeout(() => onDismiss(toast.id), remainingTimeRef.current)

    return () => {
      clearTimeout(timeoutId)
      remainingTimeRef.current -= Date.now() - startedAt
    }
  }, [isPaused, onDismiss, toast.id])

  function handleAction() {
    toast.onAction()
    onDismiss(toast.id)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="flex w-full items-center gap-3 rounded-card bg-ink py-2 pr-2 pl-4 text-sm text-white shadow-float sm:w-80"
    >
      <p className="flex-1">{toast.message}</p>

      {toast.actionLabel && (
        <button
          type="button"
          onClick={handleAction}
          className="rounded px-2 py-1 font-semibold text-accent-soft hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent-soft"
        >
          {toast.actionLabel}
        </button>
      )}

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-accent-soft"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
