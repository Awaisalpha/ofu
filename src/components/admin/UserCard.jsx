import { formatDate } from '../../utils/dates'
import Avatar from '../ui/Avatar'
import UserRoleBadge from './UserRoleBadge'
import UserStatusBadge from './UserStatusBadge'
import UserStatusButton from './UserStatusButton'

// The same information as a table row, stacked for phones.
export default function UserCard({ user, isCurrentAdmin, onToggle }) {
  return (
    <div className={`rounded-card border border-line p-4 ${user.isActive ? 'bg-surface' : 'bg-canvas'}`}>
      <div className="flex items-start gap-3">
        <Avatar name={user.name} />
        <div className="min-w-0 flex-1">
          <h2 className={`text-[15px] leading-5 font-semibold ${user.isActive ? 'text-ink' : 'text-muted'}`}>
            {user.name}
          </h2>
          <p className="mt-0.5 text-[13px] break-all text-muted">{user.email}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <UserRoleBadge role={user.role} />
            <UserStatusBadge isActive={user.isActive} />
          </div>
          <p className="mt-2 text-[13px] text-muted">Joined {formatDate(user.joinedAt)}</p>
        </div>
      </div>
      <UserStatusButton user={user} isCurrentAdmin={isCurrentAdmin} onToggle={onToggle} className="mt-3" />
    </div>
  )
}
