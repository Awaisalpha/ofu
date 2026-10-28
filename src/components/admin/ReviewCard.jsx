import { describeDaysLeft, formatDate } from '../../utils/dates'
import ExpandableText from '../opportunity/ExpandableText'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import ReviewChecks from './ReviewChecks'

// One pending post in the admin queue. The card itself can take focus,
// so focus has somewhere to land when the card before it is approved or rejected.
export default function ReviewCard({ post, posterName, onApprove, onReject }) {
  return (
    <article
      tabIndex={-1}
      aria-labelledby={`review-${post.id}`}
      className="rounded-card border border-line bg-surface p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
    >
      <Badge>{post.type}</Badge>
      <h2 id={`review-${post.id}`} className="mt-2 text-[17px] leading-snug font-semibold text-pretty">
        {post.title}
      </h2>
      <p className="mt-0.5 text-sm text-muted">{post.organisation || 'No organisation'}</p>

      <dl className="mt-3 flex flex-col gap-x-6 gap-y-1 text-[13px] leading-5 sm:flex-row sm:flex-wrap">
        <div>
          <dt className="inline text-muted">Posted by </dt>
          <dd className="inline font-medium">{posterName}</dd>
        </div>
        <div>
          <dt className="inline text-muted">Posted </dt>
          <dd className="inline font-medium">{formatDate(post.postedAt)}</dd>
        </div>
        <div>
          <dt className="inline text-muted">Deadline </dt>
          <dd className="inline font-medium">
            {formatDate(post.deadline)} · {describeDaysLeft(post.deadline)}
          </dd>
        </div>
      </dl>

      <div className="mt-3">
        <h3 className="sr-only">Description</h3>
        <ExpandableText id={`review-description-${post.id}`} text={post.description} clampClassName="line-clamp-3" />
      </div>

      <div className="mt-4 rounded-card bg-canvas px-3 py-2.5">
        <ReviewChecks post={post} />
      </div>

      {/* On phones Approve sits on top, closest to the thumb. */}
      <div className="mt-4 flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => onReject(post)}>
          Reject
        </Button>
        <Button onClick={() => onApprove(post)}>Approve</Button>
      </div>
    </article>
  )
}
