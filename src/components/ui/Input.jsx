// className sets the horizontal padding, so an icon can sit inside the field.
// Text is 16px on mobile so iOS doesn't zoom in on focus.
export default function Input({ className = 'px-3', ...props }) {
  return (
    <input
      className={`h-9 w-full rounded-card border border-line-strong bg-surface text-base placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm ${className}`}
      {...props}
    />
  )
}
