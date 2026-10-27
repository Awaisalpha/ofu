// children is the one action, e.g. a button or link.
export default function EmptyState({ icon: Icon, message, children }) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line-strong bg-surface px-4 py-10 text-center">
      <Icon size={24} className="text-muted" aria-hidden="true" />
      <p className="mt-2 text-sm text-muted">{message}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}
