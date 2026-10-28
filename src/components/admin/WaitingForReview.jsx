import { CircleCheck } from 'lucide-react'
import { typeStyles } from '../opportunity/typeStyles'
import ArrowLink from '../ui/ArrowLink'
import TintedSquare from '../ui/TintedSquare'
import WaitingChip from './WaitingChip'

// The oldest pending posts with their type, poster and how long they have waited.
// posts is a list of { post, posterName }, oldest first.
export default function WaitingForReview({ posts }) {
  return (
    <section
      aria-labelledby="waiting-title"
      className="min-w-0 rounded-card border border-line bg-surface p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="waiting-title" className="text-base leading-snug font-semibold">
            Waiting for review
          </h2>
          <p className="mt-0.5 text-[13px] text-muted">Oldest first</p>
        </div>
        {posts.length > 0 && <ArrowLink to="/admin/pending">Review</ArrowLink>}
      </div>

      {posts.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <CircleCheck size={16} className="shrink-0 text-open" aria-hidden="true" />
          All caught up. Nothing is waiting for review.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {posts.map(({ post, posterName }) => {
            const { icon: TypeIcon, tintClassName } = typeStyles[post.type]
            return (
              <li key={post.id} className="flex gap-3 py-3">
                <TintedSquare tintClassName={tintClassName}>
                  <TypeIcon size={18} />
                </TintedSquare>
                <div className="min-w-0">
                  <p className="text-sm leading-5 font-medium text-pretty break-words">{post.title}</p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {post.type} · By {posterName}
                  </p>
                  <div className="mt-1.5">
                    <WaitingChip postedAt={post.postedAt} />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
