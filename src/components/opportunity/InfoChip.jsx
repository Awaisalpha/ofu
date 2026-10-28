// A small neutral chip with an icon, for card details like type and location.
export default function InfoChip({ icon: Icon, children }) {
  return (
    <li className="inline-flex h-6 max-w-full items-center gap-1 rounded border border-line bg-canvas px-2 text-xs text-muted">
      <Icon size={12} className="shrink-0" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </li>
  )
}
