import { formatDate } from '../../utils/dates'
import DeadlineBadge from '../opportunity/DeadlineBadge'
import ExpandableText from '../opportunity/ExpandableText'
import KeyFacts from '../opportunity/KeyFacts'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Dialog from '../ui/Dialog'

// The post as a student will see it on the detail page, read only and without switching role.
export default function StudentPreviewDialog({ post, onClose }) {
  return (
    <Dialog
      open={post !== null}
      onClose={onClose}
      title="Student preview"
      description="Read only. This is how students will see the post once it's approved."
    >
      {post && (
        <>
          <article className="overflow-hidden rounded-card border border-line">
            <header className="p-4">
              <div className="flex min-h-5 flex-wrap items-center gap-2">
                <Badge>{post.type}</Badge>
                <DeadlineBadge deadline={post.deadline} />
              </div>
              <h3 className="mt-3 text-xl leading-tight font-semibold tracking-tight text-balance break-words">
                {post.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-muted">{post.organisation || 'No organisation'}</p>
            </header>

            <KeyFacts opportunity={post} />

            <div className="p-4">
              <h4 className="text-sm font-semibold">Description</h4>
              <div className="mt-1.5">
                <ExpandableText id={`preview-description-${post.id}`} text={post.description} />
              </div>
              <p className="mt-4 text-xs text-muted">Posted {formatDate(post.postedAt)}</p>
            </div>
          </article>

          <div className="mt-5 flex justify-end">
            <Button variant="secondary" onClick={onClose} className="max-sm:w-full">
              Close preview
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
