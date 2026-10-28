import { ArrowLeft, FileQuestion } from 'lucide-react'
import { startTransition } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ExpandableText from '../../components/opportunity/ExpandableText'
import KeyFacts from '../../components/opportunity/KeyFacts'
import PostStatusBanner from '../../components/opportunity/PostStatusBanner'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { useApp } from '../../store/AppContext'
import { getAlumniPosts } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'
import { formatDate } from '../../utils/dates'

const backLink = (
  <Link
    to="/alumni/posts"
    className="inline-flex items-center gap-1 rounded text-sm font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
  >
    <ArrowLeft size={15} aria-hidden="true" />
    Back to My posts
  </Link>
)

// The alumnus's own view of one post: what state it is in and what to do next.
export default function AlumniPostDetail() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()

  // Only this alumnus's own posts, whatever their status.
  const post = getAlumniPosts(state).find((item) => item.id === id)

  if (!post) {
    return (
      <section className="mx-auto max-w-[800px]">
        <h1 className="sr-only">Post not found</h1>
        <EmptyState icon={FileQuestion} message="This post isn't one of yours, or it was withdrawn.">
          {backLink}
        </EmptyState>
      </section>
    )
  }

  const applicantCount = state.applications.filter((application) => application.opportunityId === post.id).length

  // React Router runs navigation as a transition. Removing the post in the same
  // transition makes both land together; otherwise this page would flash "Post not found".
  function withdrawPost() {
    navigate('/alumni/posts')
    startTransition(() => dispatch({ type: 'WITHDRAW_OPPORTUNITY', id: post.id }))
    showToast({
      message: 'Post withdrawn',
      actionLabel: 'Undo',
      onAction: () => dispatch({ type: 'RESTORE_OPPORTUNITY', opportunity: post }),
    })
  }

  return (
    <section className="mx-auto max-w-[800px]">
      {backLink}

      <div className="mt-3">
        <PostStatusBanner
          post={post}
          applicantCount={applicantCount}
          onWithdraw={withdrawPost}
          onResubmit={() => navigate(`/alumni/post?from=${post.id}`)}
        />
      </div>

      <article className="mt-4 rounded-card border border-line bg-surface">
        <header className="p-5 sm:p-6">
          <Badge>{post.type}</Badge>
          <h1 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance">{post.title}</h1>
          <p className="mt-1 text-sm font-medium text-muted">{post.organisation}</p>
        </header>

        <KeyFacts opportunity={post} />

        <div className="p-5 sm:p-6">
          <h2 className="text-sm font-semibold">Description</h2>
          <div className="mt-1.5">
            <ExpandableText key={post.id} id="post-description" text={post.description} />
          </div>
          <p className="mt-4 text-xs text-muted">Posted {formatDate(post.postedAt)}</p>
        </div>
      </article>
    </section>
  )
}
