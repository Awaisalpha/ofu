// label is an optional small uppercase line above the heading.
export default function SectionHeading({ id, label, title, intro }) {
  return (
    <div className="max-w-2xl">
      {label && <p className="mb-2 text-xs leading-4 font-semibold tracking-[0.12em] text-accent uppercase">{label}</p>}
      <h2 id={id} className="text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-2 text-base text-pretty text-muted">{intro}</p>}
    </div>
  )
}
