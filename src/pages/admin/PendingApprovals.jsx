import { ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import FocusReviewCard from '../../components/admin/FocusReviewCard'
import RejectPostForm from '../../components/admin/RejectPostForm'
import StudentPreviewDialog from '../../components/admin/StudentPreviewDialog'
import Button from '../../components/ui/Button'
import ButtonLink from '../../components/ui/ButtonLink'
import Dialog from '../../components/ui/Dialog'
import EmptyState from '../../components/ui/EmptyState'
import { useApp } from '../../store/AppContext'
import { getPendingPosts, getUserName } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'

// One pending post at a time. After a decision the next post fades in,
// focus moves to its title and a screen reader hears what happened.
export default function PendingApprovals() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const [currentId, setCurrentId] = useState(null)
  const [postBeingRejected, setPostBeingRejected] = useState(null)
  const [previewPost, setPreviewPost] = useState(null)
  const [announcement, setAnnouncement] = useState('')
  const headingRef = useRef(null)
  const titleRef = useRef(null)
  const shouldFocusTitleRef = useRef(false)

  const pendingPosts = getPendingPosts(state)

  // The queue size when the page opened. Undo brings posts back, so progress is worked out
  // from what is still pending rather than counted per click.
  const [startingCount] = useState(pendingPosts.length)
  const totalCount = Math.max(startingCount, pendingPosts.length)
  const decidedCount = totalCount - pendingPosts.length

  const currentIndex = Math.max(0, pendingPosts.findIndex((post) => post.id === currentId))
  const currentPost = pendingPosts[currentIndex]
  // aria-disabled rather than disabled, so focus isn't lost when the end of the queue is reached.
  const isFirst = currentIndex === 0
  const isLast = currentIndex === pendingPosts.length - 1
  const progressPercent = totalCount === 0 ? 100 : Math.round((decidedCount / totalCount) * 100)

  // After a decision, focus the next post's title (or the page heading when the queue is empty).
  useEffect(() => {
    if (!shouldFocusTitleRef.current) return
    shouldFocusTitleRef.current = false
    ;(titleRef.current ?? headingRef.current).focus()
  }, [pendingPosts.length])

  function describePosition(post, positionInQueue, decidedSoFar) {
    return `Now reviewing “${post.title}”, ${decidedSoFar + positionInQueue + 1} of ${totalCount}.`
  }

  function goTo(index) {
    const post = pendingPosts[index]
    setCurrentId(post.id)
    setAnnouncement(describePosition(post, index, decidedCount))
  }

  function moveOnAfter(decidedPost, verb) {
    const index = pendingPosts.findIndex((post) => post.id === decidedPost.id)
    const nextPost = pendingPosts[index + 1] ?? pendingPosts[index - 1]
    setCurrentId(nextPost?.id ?? null)
    shouldFocusTitleRef.current = true

    if (nextPost) {
      // Once the decided post leaves, the next one sits where it was (or one up, if it was last).
      const nextPosition = pendingPosts[index + 1] ? index : index - 1
      setAnnouncement(`${verb} “${decidedPost.title}”. ${describePosition(nextPost, nextPosition, decidedCount + 1)}`)
    } else {
      setAnnouncement(`${verb} “${decidedPost.title}”. All caught up.`)
    }
  }

  function undoDecision(post) {
    dispatch({ type: 'SET_OPPORTUNITY_STATUS', id: post.id, status: 'pending' })
  }

  function approvePost(post) {
    moveOnAfter(post, 'Approved')
    dispatch({ type: 'SET_OPPORTUNITY_STATUS', id: post.id, status: 'approved' })
    showToast({
      message: `Approved “${post.title}”. Students can see it now.`,
      actionLabel: 'Undo',
      onAction: () => undoDecision(post),
    })
  }

  function rejectPost(reason) {
    const post = postBeingRejected
    moveOnAfter(post, 'Rejected')
    dispatch({ type: 'SET_OPPORTUNITY_STATUS', id: post.id, status: 'rejected', rejectReason: reason })
    setPostBeingRejected(null)
    showToast({
      message: `Rejected “${post.title}”`,
      actionLabel: 'Undo',
      onAction: () => undoDecision(post),
    })
  }

  return (
    <section>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="rounded text-2xl leading-tight font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Pending approvals <span className="font-normal text-muted tabular-nums">({pendingPosts.length})</span>
      </h1>
      <p className="mt-1 text-sm text-pretty text-muted">
        Oldest first. Approved posts appear in student Browse straight away.
      </p>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="mx-auto mt-6 max-w-[760px]">
        {currentPost ? (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="min-w-40 flex-1">
                <p className="text-sm font-semibold tabular-nums">
                  Reviewing {decidedCount + currentIndex + 1} of {totalCount}
                </p>
                <div
                  role="progressbar"
                  aria-label="Review progress"
                  aria-valuemin={0}
                  aria-valuemax={totalCount}
                  aria-valuenow={decidedCount}
                  aria-valuetext={`${decidedCount} of ${totalCount} posts decided`}
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
                >
                  <div
                    className="h-full rounded-full bg-accent motion-safe:transition-[width] motion-safe:duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={isFirst ? undefined : () => goTo(currentIndex - 1)}
                  aria-disabled={isFirst || undefined}
                  aria-label="Previous post"
                  className="aria-disabled:bg-canvas aria-disabled:text-muted"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={isLast ? undefined : () => goTo(currentIndex + 1)}
                  aria-disabled={isLast || undefined}
                  aria-label="Next post"
                  className="aria-disabled:bg-canvas aria-disabled:text-muted"
                >
                  Next
                  <ChevronRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>

            <FocusReviewCard
              key={currentPost.id}
              post={currentPost}
              posterName={getUserName(state, currentPost.postedBy)}
              titleRef={titleRef}
              onApprove={approvePost}
              onReject={setPostBeingRejected}
              onPreview={setPreviewPost}
            />
          </>
        ) : (
          <EmptyState icon={CircleCheck} message="All caught up. New posts from alumni will appear here.">
            <ButtonLink to="/student/browse">View live opportunities</ButtonLink>
          </EmptyState>
        )}
      </div>

      <Dialog
        open={postBeingRejected !== null}
        onClose={() => setPostBeingRejected(null)}
        title="Reject this post"
        description={postBeingRejected?.title}
      >
        <RejectPostForm onSubmit={rejectPost} onCancel={() => setPostBeingRejected(null)} />
      </Dialog>
      <StudentPreviewDialog post={previewPost} onClose={() => setPreviewPost(null)} />
    </section>
  )
}
