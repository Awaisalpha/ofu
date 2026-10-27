export default function SectionHeading({ id, title, intro }) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-2 text-base text-pretty text-muted">{intro}</p>}
    </div>
  )
}
