// aria-disabled buttons look the same as disabled ones but stay focusable;
// the caller must leave out onClick for them.
const variantClasses = {
  primary:
    'bg-accent text-white not-aria-disabled:hover:bg-accent-hover disabled:bg-line disabled:text-muted aria-disabled:bg-line aria-disabled:text-muted',
  secondary: 'border border-line bg-surface text-ink hover:bg-canvas disabled:text-muted',
}

// lg is for the landing page search.
const sizeClasses = {
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-11 px-5 text-base',
}

export default function Button({ variant = 'primary', size = 'md', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-1.5 rounded-card font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed aria-disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
