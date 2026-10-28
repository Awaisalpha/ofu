import { Eye } from 'lucide-react'

export default function PreviewLink({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={`inline-flex min-h-6 items-center gap-1.5 rounded text-sm font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <Eye size={15} aria-hidden="true" />
      Preview as student
    </button>
  )
}
