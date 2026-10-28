// Where a message scrap in the Why OFU section came from, like "WhatsApp group".
export default function SourceLabel({ icon: Icon, children }) {
  return (
    <span className="mt-2 flex items-center gap-1.5 text-xs leading-4 font-medium text-muted">
      <Icon size={13} aria-hidden="true" />
      {children}
    </span>
  )
}
