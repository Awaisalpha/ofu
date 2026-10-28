import ExpandableText from '../opportunity/ExpandableText'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import ChecksList from './ChecksList'
import ChecksSummary from './ChecksSummary'
import PosterFacts from './PosterFacts'
import PreviewLink from './PreviewLink'
import WaitingChip from './WaitingChip'

// The single post under review in Focus mode. It fades in when it replaces the previous post,
// only for people who haven't asked for less motion.
export default function FocusReviewCard({ post, posterName, titleRef, onApprove, onReject, onPreview }) {
  return (
    <article
      aria-labelledby={`focus-title-${post.id}`}
      className="rounded-card border border-line bg-surface shadow-card-hover motion-safe:animate-fade-in"
    >
      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{post.type}</Badge>
          <WaitingChip postedAt={post.postedAt} />
        </div>
        <h2
          ref={titleRef}
          id={`focus-title-${post.id}`}
          tabIndex={-1}
          className="mt-3 rounded text-2xl leading-tight font-semibold tracking-tight text-balance break-words focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-[28px]"
        >
          {post.title}
        </h2>
        <p className="mt-1 text-base font-medium text-muted">{post.organisation || 'No organisation'}</p>

        <div className="mt-5 border-y border-line py-3">
          <PosterFacts post={post} posterName={posterName} />
        </div>

        <h3 className="mt-6 text-sm font-semibold">Description</h3>
        <div className="mt-1.5">
          <ExpandableText id={`focus-description-${post.id}`} text={post.description} clampClassName="" />
        </div>

        <section aria-labelledby={`focus-checks-${post.id}`} className="mt-6 rounded-card bg-canvas p-3">
          <h3 id={`focus-checks-${post.id}`}>
            <ChecksSummary post={post} />
          </h3>
          <div className="mt-2 border-t border-line pt-2">
            <ChecksList post={post} />
          </div>
        </section>

        <PreviewLink onClick={() => onPreview(post)} className="mt-5" />
      </div>

      <footer className="grid grid-cols-2 gap-3 border-t border-line p-5 sm:px-8">
        <Button variant="secondary" size="lg" onClick={() => onReject(post)}>
          Reject
        </Button>
        <Button size="lg" onClick={() => onApprove(post)}>
          Approve
        </Button>
      </footer>
    </article>
  )
}
