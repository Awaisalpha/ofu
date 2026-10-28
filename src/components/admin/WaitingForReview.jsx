import { CircleCheck } from 'lucide-react'
import { formatDate } from '../../utils/dates'
import ArrowLink from '../ui/ArrowLink'

// The oldest few pending posts, with a shortcut to the full queue.
// posts is a list of { post, posterName }.
export default function WaitingForReview({ posts }) {
  return (
    <section aria-labelledby="waiting-title" className="rounded-card border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 id="waiting-title" className="text-base leading-snug font-semibold">
          Waiting for review
        </h2>
        {posts.length > 0 && <ArrowLink to="/admin/pending">Review</ArrowLink>}
      </div>

      {posts.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <CircleCheck size={16} className="shrink-0 text-open" aria-hidden="true" />
          All caught up. Nothing is waiting for review.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-line">
          {posts.map(({ post, posterName }) => (
            <li key={post.id} className="py-3">
              <p className="text-sm leading-5 font-medium text-pretty">{post.title}</p>
              <p className="mt-0.5 text-[13px] text-muted">
                By {posterName} · Posted {formatDate(post.postedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
