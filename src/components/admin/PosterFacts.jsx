import { getAvatarTint } from '../../utils/avatarTint'
import { describeDaysLeft, formatDate } from '../../utils/dates'
import Avatar from '../ui/Avatar'

// Who posted it, when, and the deadline with days left.
export default function PosterFacts({ post, posterName }) {
  return (
    <dl className="flex flex-col gap-x-6 gap-y-1.5 text-[13px] leading-5 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex items-center gap-1.5">
        <dt className="sr-only">Posted by</dt>
        <Avatar name={posterName} tintClassName={getAvatarTint(posterName)} className="size-6 text-[10px]" />
        <dd className="font-medium">{posterName}</dd>
      </div>
      <div>
        <dt className="inline text-muted">Posted </dt>
        <dd className="inline font-medium">{formatDate(post.postedAt)}</dd>
      </div>
      <div>
        <dt className="inline text-muted">Deadline </dt>
        <dd className="inline font-medium">
          {formatDate(post.deadline)} <span className="font-normal text-muted">· {describeDaysLeft(post.deadline)}</span>
        </dd>
      </div>
    </dl>
  )
}
