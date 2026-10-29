import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { typeStyles } from './typeStyles'
import TintedSquare from '../ui/TintedSquare'
import { describeDaysLeft, formatDate } from '../../utils/dates'
import ApplicantRow from './ApplicantRow'

// One post and its applicants under the current tab.
// An accent bar marks the post, and a guide line runs from its icon to each applicant, like a tree.
// The guide line sits 20px in, under the icon's centre; the list starts 32px in on mobile and 44px from md up.
// totalCount and toReviewCount count every applicant to the post, whatever the tab.
export default function ApplicantPostGroup({ post, entries, totalCount, toReviewCount, onDecide, onUndo }) {
  const { icon: TypeIcon, tintClassName } = typeStyles[post.type]
  const headingId = `post-group-${post.id}`
  const metaItems = [
    `Deadline ${formatDate(post.deadline)}`,
    describeDaysLeft(post.deadline),
    `${totalCount} ${totalCount === 1 ? 'applicant' : 'applicants'}, ${toReviewCount} to review`,
  ]

  return (
    <section aria-labelledby={headingId} className="border-l-[3px] border-accent pl-4">
      <p className="mb-1.5 text-xs leading-4 font-medium tracking-wide text-muted uppercase">Post</p>

      <div className="flex gap-3">
        {/* The icon and the start of the guide line below it. */}
        <div className="flex w-10 shrink-0 flex-col items-center">
          <TintedSquare tintClassName={tintClassName}>
            <TypeIcon size={18} />
          </TintedSquare>
          <span aria-hidden="true" className="w-px flex-1 bg-line-strong" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 pb-3 md:flex-row md:items-start md:gap-4">
          <div className="min-w-0 flex-1">
            <h2 id={headingId} className="text-lg leading-7 font-semibold break-words">
              {post.title}
            </h2>
            {/* Separate items, so a narrow screen wraps between them rather than inside one. */}
            <p className="flex flex-wrap gap-x-1.5 text-[13px] leading-5 text-muted tabular-nums">
              {metaItems.map((item, index) => (
                <span key={item} className="whitespace-nowrap">
                  {index > 0 && <span aria-hidden="true">· </span>}
                  {item}
                </span>
              ))}
            </p>
          </div>
          <Link
            to={`/alumni/posts/${post.id}`}
            className="inline-flex shrink-0 items-center gap-1 self-start rounded py-1 text-sm font-medium text-accent-strong underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mt-0.5"
          >
            View post
            <span className="sr-only">: {post.title}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <ul className="ml-8 divide-y divide-line rounded-card border border-line bg-surface md:ml-11">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1
          return (
            <li key={entry.application.id} className="relative">
              {/* Vertical guide down the left (stopping at the last row's tick), then a tick into the row. */}
              <span
                aria-hidden="true"
                className={`absolute -top-px -left-[13px] w-px bg-line-strong md:-left-[25px] ${isLast ? 'h-[35px]' : '-bottom-px'}`}
              />
              {/* 34px is the avatar's centre: 12px row padding plus half the 44px name block. */}
              <span
                aria-hidden="true"
                className="absolute top-[34px] -left-[13px] h-px w-3 bg-line-strong md:-left-[25px] md:w-6"
              />
              <ApplicantRow entry={entry} onDecide={onDecide} onUndo={onUndo} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
