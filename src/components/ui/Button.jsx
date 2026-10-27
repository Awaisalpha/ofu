const variantClasses = {
  primary: 'bg-accent text-white hover:bg-accent-hover disabled:bg-line disabled:text-muted',
  secondary: 'border border-line bg-surface text-ink hover:bg-canvas disabled:text-muted',
}

export default function Button({ variant = 'primary', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-card px-3.5 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
