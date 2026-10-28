import { formatDate } from '../../utils/dates'
import { getAvatarTint } from '../../utils/avatarTint'
import Avatar from '../ui/Avatar'
import ActiveSwitch from './ActiveSwitch'
import UserRoleBadge from './UserRoleBadge'
import YouChip from './YouChip'

// One user in the Users list: no table chrome, just a hairline below and generous space.
// There is no header row, so the join date carries its own label.
// On phones the role and join date move to their own lines under the name.
export default function UserRow({ user, isCurrentAdmin, onToggle }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-line py-6 md:grid-cols-[minmax(0,1fr)_7rem_8rem_auto] md:gap-x-8">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar
          name={user.name}
          className={`size-12 text-base ${user.isActive ? '' : 'opacity-60'}`}
          tintClassName={getAvatarTint(user.name)}
        />
        <div className="min-w-0">
          <h2 className="flex items-center gap-2">
            <span className={`truncate text-base font-semibold ${user.isActive ? 'text-ink' : 'text-muted'}`}>
              {user.name}
            </span>
            {isCurrentAdmin && <YouChip />}
            {/* On the name line, so toggling never changes the row height. */}
            {!user.isActive && <span className="shrink-0 text-[13px] font-medium text-muted">Deactivated</span>}
          </h2>
          <p className="mt-0.5 truncate text-sm text-muted" title={user.email}>
            {user.email}
          </p>
        </div>
      </div>

      <div className="col-span-2 col-start-1 row-start-2 pl-16 md:col-span-1 md:col-start-2 md:row-start-1 md:pl-0">
        <UserRoleBadge role={user.role} />
      </div>
      <div className="col-span-2 col-start-1 row-start-3 pl-16 text-sm md:col-span-1 md:col-start-3 md:row-start-1 md:pl-0">
        <span className="text-[13px] text-muted">Joined </span>
        <span className="whitespace-nowrap tabular-nums md:block">{formatDate(user.joinedAt)}</span>
      </div>

      <div className="col-start-2 row-start-1 md:col-start-4">
        <ActiveSwitch user={user} isCurrentAdmin={isCurrentAdmin} onToggle={onToggle} />
      </div>
    </li>
  )
}
