import { CircleCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import RejectPostForm from '../../components/admin/RejectPostForm'
import ReviewCard from '../../components/admin/ReviewCard'
import ButtonLink from '../../components/ui/ButtonLink'
import Dialog from '../../components/ui/Dialog'
import EmptyState from '../../components/ui/EmptyState'
import { useApp } from '../../store/AppContext'
import { getPendingPosts, getUserName } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'

export default function PendingApprovals() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const [postBeingRejected, setPostBeingRejected] = useState(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)
  // Where the decided card was, so focus can move to the card that takes its place.
  const removedIndexRef = useRef(null)

  const pendingPosts = getPendingPosts(state)

  // Runs after the decided card has left the list (and after the dialog has closed).
  useEffect(() => {
    const index = removedIndexRef.current
    if (index === null) return
    removedIndexRef.current = null
    const cards = listRef.current?.querySelectorAll('article') ?? []
    const nextCard = cards[index] ?? cards[cards.length - 1]
    ;(nextCard ?? headingRef.current).focus()
  }, [pendingPosts.length])

  function rememberPosition(post) {
    removedIndexRef.current = pendingPosts.findIndex((pendingPost) => pendingPost.id === post.id)
  }

  function undoDecision(post) {
    dispatch({ type: 'SET_OPPORTUNITY_STATUS', id: post.id, status: 'pending' })
  }

  function approvePost(post) {
    rememberPosition(post)
    dispatch({ type: 'SET_OPPORTUNITY_STATUS', id: post.id, status: 'approved' })
    showToast({
      message: `Approved “${post.title}”. Students can see it now.`,
      actionLabel: 'Undo',
      onAction: () => undoDecision(post),
    })
  }

  function rejectPost(reason) {
    const post = postBeingRejected
    rememberPosition(post)
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
      <p className="mt-1 text-sm text-muted">Oldest first. Approved posts appear in student Browse straight away.</p>

      <div className="mt-5">
        {pendingPosts.length === 0 ? (
          <EmptyState icon={CircleCheck} message="All caught up. New posts from alumni will appear here.">
            <ButtonLink to="/admin/overview">Back to overview</ButtonLink>
          </EmptyState>
        ) : (
          <ul ref={listRef} className="space-y-3">
            {pendingPosts.map((post) => (
              <li key={post.id}>
                <ReviewCard
                  post={post}
                  posterName={getUserName(state, post.postedBy)}
                  onApprove={approvePost}
                  onReject={setPostBeingRejected}
                />
              </li>
            ))}
          </ul>
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
    </section>
  )
}
