// Matches Input. Text is 16px on mobile so iOS doesn't zoom in on focus.
export default function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`block w-full rounded-card border border-line-strong bg-surface px-3 py-2 text-base leading-normal placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-danger sm:text-sm ${className}`}
      {...props}
    />
  )
}
