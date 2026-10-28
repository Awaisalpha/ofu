import { CircleCheck, CircleX, Clock } from 'lucide-react'
import Badge from '../ui/Badge'

// Icon + text for each post status, so it never relies on colour alone.
const statusStyles = {
  pending: { label: 'Pending', icon: Clock, className: 'bg-closing-soft text-closing' },
  approved: { label: 'Approved', icon: CircleCheck, className: 'bg-open-soft text-open' },
  rejected: { label: 'Rejected', icon: CircleX, className: 'bg-danger-soft text-danger' },
}

export default function PostStatusBadge({ status }) {
  const { label, icon: Icon, className } = statusStyles[status]

  return (
    <Badge className={className}>
      <Icon size={13} aria-hidden="true" />
      {label}
    </Badge>
  )
}
