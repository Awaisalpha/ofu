// "Usman Tariq" → "UT"
function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Initials in a circle. Decorative, because the name is always written next to it.
// className sets the size and text size, e.g. 'size-10 text-sm'.
export default function Avatar({ name, className = 'size-10 text-sm' }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-accent-soft font-semibold text-accent-strong ${className}`}
    >
      {getInitials(name)}
    </span>
  )
}
