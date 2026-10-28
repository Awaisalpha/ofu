import { Link } from 'react-router'

// A link that looks like a Button, for actions that navigate.
const variantClasses = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'border border-line bg-surface text-ink hover:bg-canvas',
}

export default function ButtonLink({ variant = 'primary', className = '', ...props }) {
  return (
    <Link
      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-card px-3.5 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
