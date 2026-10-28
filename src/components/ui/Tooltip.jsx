import { useState } from 'react'

// A short hint above a control, shown on hover and keyboard focus. It is positioned
// out of the flow, so it never changes the height of the row it sits in.
// The control must point at it with aria-describedby={id}. Esc hides it (WCAG 1.4.13).
export default function Tooltip({ id, text, children }) {
  const [isDismissed, setIsDismissed] = useState(false)

  function handleKeyDown(event) {
    if (event.key !== 'Escape' || isDismissed) return
    // Inside a dialog, the first Esc only hides the tooltip.
    event.preventDefault()
    setIsDismissed(true)
  }

  return (
    <span
      className="group/tooltip relative inline-flex"
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setIsDismissed(false)}
      onBlur={() => setIsDismissed(false)}
    >
      {children}
      {/* The bottom padding bridges the gap, so the pointer can move onto the tooltip. */}
      <span
        id={id}
        role="tooltip"
        className={`absolute right-0 bottom-full z-10 w-max max-w-56 pb-1.5 ${
          isDismissed ? 'invisible' : 'invisible group-focus-within/tooltip:visible group-hover/tooltip:visible'
        }`}
      >
        <span className="block rounded-card bg-ink px-2.5 py-1.5 text-xs leading-4 font-medium text-white shadow-float">
          {text}
        </span>
      </span>
    </span>
  )
}
