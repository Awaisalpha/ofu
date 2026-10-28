import { getInitials } from '../../utils/initials'

// Initials in a circle. Decorative, because the name is always written next to it.
// className sets the size and text size, e.g. 'size-10 text-sm'.
// tintClassName sets the background and text colour, e.g. from getAvatarTint(name).
export default function Avatar({
  name,
  className = 'size-10 text-sm',
  tintClassName = 'bg-accent-soft text-accent-strong',
}) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-semibold ${tintClassName} ${className}`}
    >
      {getInitials(name)}
    </span>
  )
}
