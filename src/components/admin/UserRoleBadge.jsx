import Badge from '../ui/Badge'
import { roleLabels } from '../layout/navItems'

// Neutral on purpose: a role is not a status, so it gets no status colour.
export default function UserRoleBadge({ role }) {
  return <Badge className="bg-closed-soft text-ink">{roleLabels[role]}</Badge>
}
