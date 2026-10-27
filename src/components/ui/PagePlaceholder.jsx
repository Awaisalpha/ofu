// Temporary stand-in until the real page is built.
export default function PagePlaceholder({ title, milestone, children }) {
  return (
    <section>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-muted">Coming in milestone {milestone}.</p>
      {children}
    </section>
  )
}
