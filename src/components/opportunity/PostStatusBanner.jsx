import { CircleCheck, CircleX, Clock } from 'lucide-react'
import { formatDate } from '../../utils/dates'
import Button from '../ui/Button'
import ButtonLink from '../ui/ButtonLink'

// Each status has its own tint, border, icon and heading, so it never relies on colour alone.
// Every text colour here passes WCAG AA on its tint (5.7:1 or more).
const bannerStyles = {
  pending: { icon: Clock, title: 'Waiting for admin review', className: 'border-closing/40 bg-closing-soft', iconClassName: 'text-closing' },
  rejected: { icon: CircleX, title: 'Not approved', className: 'border-danger/40 bg-danger-soft', iconClassName: 'text-danger' },
  approved: { icon: CircleCheck, title: 'Live, visible to students', className: 'border-open/40 bg-open-soft', iconClassName: 'text-open' },
}

// A section with a heading, so screen readers can jump to it. It is not role="alert",
// because it is already there when the page loads rather than appearing after an action.
// Below 768px the buttons stack full width.
export default function PostStatusBanner({ post, applicantCount, onWithdraw, onResubmit }) {
  const { icon: Icon, title, className, iconClassName } = bannerStyles[post.status]

  return (
    <section aria-labelledby="post-status-heading" className={`rounded-card border p-4 sm:p-5 ${className}`}>
      <div className="flex gap-3">
        <Icon size={20} className={`mt-0.5 shrink-0 ${iconClassName}`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 id="post-status-heading" className="text-[15px] leading-6 font-semibold">
            {title}
          </h2>

          {post.status === 'pending' && (
            <p className="mt-0.5 text-sm leading-6 text-ink">
              Submitted {formatDate(post.postedAt)}. Students can’t see this post until it’s approved.
            </p>
          )}

          {post.status === 'rejected' && (
            <div className="mt-2">
              <h3 className="text-xs font-semibold text-muted">Reason from the admin</h3>
              <blockquote className="mt-1 max-w-[70ch] border-l-2 border-danger pl-3 text-sm leading-6 text-ink">
                {post.rejectReason || 'No reason was given.'}
              </blockquote>
            </div>
          )}

          {post.status === 'approved' && (
            <p className="mt-0.5 text-sm leading-6 text-ink">
              {applicantCount === 0
                ? 'No one has applied yet.'
                : `${applicantCount} ${applicantCount === 1 ? 'student has' : 'students have'} applied.`}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2 md:flex-row md:flex-wrap">
            {post.status === 'pending' && (
              <Button variant="danger" onClick={onWithdraw}>
                Withdraw post
              </Button>
            )}
            {post.status === 'rejected' && <Button onClick={onResubmit}>Fix and resubmit</Button>}
            {post.status === 'approved' && (
              <>
                <ButtonLink to={`/alumni/applicants?post=${post.id}`}>
                  View applicants ({applicantCount})
                </ButtonLink>
                {/* The role comes from the URL, so opening a student page switches to the student view. */}
                <ButtonLink variant="secondary" to={`/student/opportunities/${post.id}`}>
                  See it as students do
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
