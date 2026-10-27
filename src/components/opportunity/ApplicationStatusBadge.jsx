import { CircleCheck, CircleX, Send } from 'lucide-react'
import Badge from '../ui/Badge'

// Icon + text for each status, so it never relies on colour alone.
const statusStyles = {
  Submitted: { icon: Send, className: 'bg-closed-soft text-closed' },
  Accepted: { icon: CircleCheck, className: 'bg-open-soft text-open' },
  Rejected: { icon: CircleX, className: 'bg-danger-soft text-danger' },
}

export default function ApplicationStatusBadge({ status }) {
  const { icon: Icon, className } = statusStyles[status]

  return (
    <Badge className={className}>
      <Icon size={13} aria-hidden="true" />
      {status}
    </Badge>
  )
}
