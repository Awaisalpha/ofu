import { CircleAlert } from 'lucide-react'

// Inline error under a form field. The field points at it with aria-describedby.
export default function FieldError({ id, children }) {
  if (!children) return null

  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-5 text-danger">
      <CircleAlert size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}
