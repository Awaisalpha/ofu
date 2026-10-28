import { Briefcase, GraduationCap, ShieldCheck } from 'lucide-react'
import Badge from '../ui/Badge'

// Identity tints only (no red, green or amber), so a role never reads as a status.
// The icons match the role tabs on the Users page.
const roleStyles = {
  student: { label: 'Student', icon: GraduationCap, className: 'bg-tint-sky-soft text-tint-sky' },
  alumni: { label: 'Alumni', icon: Briefcase, className: 'bg-tint-violet-soft text-tint-violet' },
  admin: { label: 'Admin', icon: ShieldCheck, className: 'bg-tint-sand-soft text-tint-sand' },
}

export default function UserRoleBadge({ role }) {
  const { label, icon: Icon, className } = roleStyles[role]
  return (
    <Badge className={className}>
      <Icon size={13} aria-hidden="true" />
      {label}
    </Badge>
  )
}
