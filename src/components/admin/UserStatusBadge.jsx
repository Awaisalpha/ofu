import { CircleCheck, CircleMinus } from 'lucide-react'
import Badge from '../ui/Badge'

// Icon + text, so the status never relies on colour alone.
export default function UserStatusBadge({ isActive }) {
  if (isActive) {
    return (
      <Badge className="bg-open-soft text-open">
        <CircleCheck size={13} aria-hidden="true" />
        Active
      </Badge>
    )
  }

  return (
    <Badge className="bg-closed-soft text-closed">
      <CircleMinus size={13} aria-hidden="true" />
      Deactivated
    </Badge>
  )
}
