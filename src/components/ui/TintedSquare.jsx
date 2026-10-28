// The 40px rounded square at the start of a list row, holding initials or an icon.
// Decorative: the row always says the same thing in text.
// tintClassName sets the background and text colour, e.g. 'bg-tint-sky-soft text-tint-sky'.
export default function TintedSquare({ tintClassName, children }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-card text-sm font-semibold ${tintClassName}`}
    >
      {children}
    </span>
  )
}
