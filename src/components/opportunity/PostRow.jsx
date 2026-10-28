import { Link } from 'react-router'
import { describeDaysLeft, formatDate } from '../../utils/dates'
import Badge from '../ui/Badge'
import PostStatusBadge from './PostStatusBadge'

// A stacked card on phones, one row inside the list's border on larger screens.
// Only approved posts have a detail page students can open, so only they link.
export default function PostRow({ post, applicantCount, onWithdraw }) {
  const titleClasses = 'text-[15px] leading-5 font-semibold text-pretty'

  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-surface px-4 py-3 sm:flex-row sm:items-start sm:gap-4 sm:rounded-none sm:border-0 sm:py-3.5">
      <div className="min-w-0 flex-1">
        <h2 className={titleClasses}>
          {post.status === 'approved' ? (
            <Link
              to={`/student/opportunities/${post.id}`}
              className="rounded underline-offset-2 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h2>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
          <Badge>{post.type}</Badge>
          <span>
            Deadline {formatDate(post.deadline)} · {describeDaysLeft(post.deadline)}
          </span>
        </div>
        {post.status === 'rejected' && post.rejectReason && (
          <p className="mt-2 max-w-[70ch] text-[13px] leading-5 text-muted">
            <span className="font-semibold">Reason:</span> {post.rejectReason}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:w-64 sm:shrink-0 sm:justify-end">
        <p className="text-[13px] text-muted tabular-nums">
          {applicantCount} {applicantCount === 1 ? 'applicant' : 'applicants'}
        </p>
        <div className="flex items-center gap-3">
          {post.status === 'pending' && (
            <button
              type="button"
              onClick={() => onWithdraw(post)}
              aria-label={`Withdraw ${post.title}`}
              className="rounded text-[13px] font-medium text-danger underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Withdraw
            </button>
          )}
          <PostStatusBadge status={post.status} />
        </div>
      </div>
    </div>
  )
}
