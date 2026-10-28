import { Link } from 'react-router'
import { describeDaysLeft, formatDate } from '../../utils/dates'
import ListRow from '../ui/ListRow'
import TintedSquare from '../ui/TintedSquare'
import PostStatusBadge from './PostStatusBadge'
import { typeStyles } from './typeStyles'

// Every row opens the alumni post detail page, where the status is explained.
// The applicants link sits above the stretched link (relative z-10).
export default function PostRow({ post, applicantCount }) {
  const { icon: TypeIcon, tintClassName } = typeStyles[post.type]

  return (
    <ListRow
      leading={
        <TintedSquare tintClassName={tintClassName}>
          <TypeIcon size={18} />
        </TintedSquare>
      }
      title={post.title}
      to={`/alumni/posts/${post.id}`}
      details={
        <p className="mt-0.5 text-[13px] leading-5 text-muted">
          {post.type} · Deadline {formatDate(post.deadline)} · {describeDaysLeft(post.deadline)}
        </p>
      }
      meta={
        <>
          <div className="text-[13px] @2xl:w-28">
            {applicantCount === 0 ? (
              <span className="text-muted">No applicants yet</span>
            ) : (
              <Link
                to={`/alumni/applicants?post=${post.id}`}
                className="relative z-10 rounded font-medium text-accent tabular-nums underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {applicantCount} {applicantCount === 1 ? 'applicant' : 'applicants'}
              </Link>
            )}
          </div>
          <div className="@2xl:w-24">
            <PostStatusBadge status={post.status} />
          </div>
        </>
      }
    />
  )
}
