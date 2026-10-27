import { useEffect, useId, useRef } from 'react'

// A modal built on the native <dialog>. showModal() makes the page behind it inert,
// so Tab stays inside the dialog, and the browser fires "cancel" when Esc is pressed.
// Centred on larger screens, a bottom sheet under 640px.
export default function Dialog({ open, onClose, title, description, children }) {
  const dialogRef = useRef(null)
  const pressStartedOnBackdropRef = useRef(false)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    dialog.showModal()

    return () => {
      dialog.close()
      // Give focus back to whatever opened the dialog (e.g. the Apply button).
      previouslyFocused?.focus()
    }
  }, [open])

  // Esc: let React state close the dialog instead of the browser, so they never disagree.
  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  // The <dialog> has no padding, so a click whose target is the dialog itself is on the backdrop.
  // Both the press and the release must be there, so dragging a text selection out doesn't close it.
  function handleMouseDown(event) {
    pressStartedOnBackdropRef.current = event.target === event.currentTarget
  }

  function handleClick(event) {
    if (pressStartedOnBackdropRef.current && event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={handleCancel}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-card bg-surface text-ink shadow-float backdrop:bg-ink/50 max-sm:mb-0 max-sm:max-h-[calc(100dvh-1rem)] max-sm:w-full max-sm:max-w-full max-sm:rounded-b-none"
    >
      {open && (
        <div className="p-5 sm:p-6">
          <h2 id={titleId} className="text-lg leading-snug font-semibold text-balance">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="mt-0.5 text-sm text-muted">
              {description}
            </p>
          )}
          <div className="mt-5">{children}</div>
        </div>
      )}
    </dialog>
  )
}
