import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

// A small text link with an arrow, for "go to" links that shouldn't look like buttons.
export default function ArrowLink({ className = '', children, ...props }) {
  return (
    <Link
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-card text-sm font-medium text-accent-strong underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      {...props}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  )
}
