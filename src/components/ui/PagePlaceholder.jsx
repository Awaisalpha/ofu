// Temporary stand-in until the real page is built.
export default function PagePlaceholder({ title, milestone, children }) {
  return (
    <section>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-stone-600">Coming in milestone {milestone}.</p>
      {children}
    </section>
  )
}
