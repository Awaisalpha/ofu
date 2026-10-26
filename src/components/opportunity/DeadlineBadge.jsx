import { CircleCheck, CircleX, Clock } from 'lucide-react'
import { describeDaysLeft, getDeadlineStatus } from '../../utils/dates'
import Badge from '../ui/Badge'

// Each status has its own icon and text, so it never relies on colour alone.
const statusStyles = {
  open: { label: 'Open', icon: CircleCheck, className: 'bg-green-100 text-green-800' },
  'closing-soon': { label: 'Closing soon', icon: Clock, className: 'bg-amber-100 text-amber-900' },
  closed: { label: 'Closed', icon: CircleX, className: 'bg-stone-200 text-stone-700' },
}

export default function DeadlineBadge({ deadline }) {
  const status = getDeadlineStatus(deadline)
  const { label, icon: Icon, className } = statusStyles[status]

  return (
    <Badge className={className}>
      <Icon size={14} aria-hidden="true" />
      {status === 'closed' ? label : `${label} · ${describeDaysLeft(deadline)}`}
    </Badge>
  )
}
