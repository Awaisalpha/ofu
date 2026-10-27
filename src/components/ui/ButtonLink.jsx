import { Link } from 'react-router'

// A link that looks like a primary Button, for actions that navigate.
export default function ButtonLink({ className = '', ...props }) {
  return (
    <Link
      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-card bg-accent px-3.5 text-sm font-medium whitespace-nowrap text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      {...props}
    />
  )
}
