// One labelled fact inside KeyFacts, e.g. Location: Gulberg, Lahore.
export default function KeyFact({ icon: Icon, label, children }) {
  return (
    <div className="px-5 py-3 sm:px-6">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <Icon size={13} aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold">{children}</dd>
    </div>
  )
}
