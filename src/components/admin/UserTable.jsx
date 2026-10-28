import { formatDate } from '../../utils/dates'
import Avatar from '../ui/Avatar'
import UserRoleBadge from './UserRoleBadge'
import UserStatusBadge from './UserStatusBadge'
import UserStatusButton from './UserStatusButton'

const headerClasses = 'px-3 py-2.5 text-left text-xs font-semibold text-muted'

// Shown from 1024px up. Until 1280px the Email column folds into the Name cell,
// so the table fits beside the sidebar.
export default function UserTable({ users, currentAdminId, onToggle }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      <table className="w-full text-sm">
        <caption className="sr-only">Users</caption>
        <thead className="border-b border-line bg-canvas">
          <tr>
            <th scope="col" className={headerClasses}>
              Name
            </th>
            <th scope="col" className={`${headerClasses} hidden xl:table-cell`}>
              Email
            </th>
            <th scope="col" className={headerClasses}>
              Role
            </th>
            <th scope="col" className={headerClasses}>
              Joined
            </th>
            <th scope="col" className={headerClasses}>
              Status
            </th>
            <th scope="col" className={headerClasses}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {users.map((user) => (
            <tr key={user.id} className={user.isActive ? '' : 'bg-canvas'}>
              <th scope="row" className="px-3 py-3 text-left font-normal">
                <div className="flex items-center gap-2.5">
                  <Avatar name={user.name} className="size-8 text-xs" />
                  <div className="min-w-0">
                    <p className={`font-medium ${user.isActive ? 'text-ink' : 'text-muted'}`}>{user.name}</p>
                    <p className="text-[13px] break-all text-muted xl:hidden">{user.email}</p>
                  </div>
                </div>
              </th>
              <td className="hidden px-3 py-3 break-all text-muted xl:table-cell">{user.email}</td>
              <td className="px-3 py-3">
                <UserRoleBadge role={user.role} />
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-muted tabular-nums">
                {formatDate(user.joinedAt)}
              </td>
              <td className="px-3 py-3">
                <UserStatusBadge isActive={user.isActive} />
              </td>
              <td className="px-3 py-3 align-top">
                <UserStatusButton
                  user={user}
                  isCurrentAdmin={user.id === currentAdminId}
                  onToggle={onToggle}
                  className="w-28"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
