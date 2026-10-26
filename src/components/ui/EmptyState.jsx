// children is the one action, e.g. a button or link.
export default function EmptyState({ icon: Icon, message, children }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-stone-300 px-4 py-12 text-center">
      <Icon size={32} className="text-stone-400" aria-hidden="true" />
      <p className="mt-3 text-stone-600">{message}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}
