import { CircleCheck, CircleX, Clock } from 'lucide-react'
import { describeDaysLeft, getDeadlineStatus } from '../../utils/dates'
import Badge from '../ui/Badge'

// Each status has its own icon and text, so it never relies on colour alone.
const statusStyles = {
  open: { label: 'Open', icon: CircleCheck, className: 'bg-open-soft text-open' },
  'closing-soon': { label: 'Closing soon', icon: Clock, className: 'bg-closing-soft text-closing' },
  closed: { label: 'Closed', icon: CircleX, className: 'bg-closed-soft text-closed' },
}

export default function DeadlineBadge({ deadline }) {
  const status = getDeadlineStatus(deadline)
  const { label, icon: Icon, className } = statusStyles[status]

  return (
    <Badge className={className}>
      <Icon size={13} aria-hidden="true" />
      {status === 'closed' ? label : `${label} · ${describeDaysLeft(deadline)}`}
    </Badge>
  )
}
