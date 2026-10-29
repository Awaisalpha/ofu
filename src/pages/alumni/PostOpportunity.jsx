import { Info } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import PostOpportunityForm from '../../components/opportunity/PostOpportunityForm'
import { CURRENT_ALUMNI_ID } from '../../data/users'
import { useApp } from '../../store/AppContext'
import { getAlumniPosts } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'
import { dateFromToday } from '../../utils/dates'

// A filled-in example, so the landing page tour shows the form and its live preview card in use.
const previewPost = {
  title: 'Junior Frontend Developer',
  type: 'Job',
  location: 'Gulberg, Lahore',
  deadline: dateFromToday(14),
  stipend: 'PKR 80,000 / month',
  description:
    'Build and polish React screens with a small product team. Fresh graduates who know HTML, CSS and JavaScript are welcome to apply with a short portfolio.',
}

// preview is the landing page tour: ignores ?from and never saves or shows a toast.
export default function PostOpportunity({ preview = false }) {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const alumnus = state.users.find((user) => user.id === CURRENT_ALUMNI_ID)

  // ?from=ID pre-fills the form with a copy of one of this alumnus's rejected posts.
  const [searchParams] = useSearchParams()
  const sourcePost = preview
    ? undefined
    : getAlumniPosts(state).find((post) => post.id === searchParams.get('from') && post.status === 'rejected')

  // New posts wait for an admin before students can see them. A resubmitted copy is a
  // new post too; the rejected one stays in My posts.
  function submitPost(post) {
    if (preview) return
    dispatch({
      type: 'ADD_OPPORTUNITY',
      opportunity: {
        ...post,
        status: 'pending',
        rejectReason: '',
        postedBy: CURRENT_ALUMNI_ID,
        postedAt: dateFromToday(0),
      },
    })
    // Leaves the "editing a copy" mode, so the next post starts from an empty form.
    if (sourcePost) navigate('/alumni/post', { replace: true })
    showToast({
      message: 'Sent for review',
      actionLabel: 'View',
      onAction: () => navigate('/alumni/posts'),
    })
  }

  let initialValues
  if (preview) {
    initialValues = { ...previewPost, organisation: alumnus?.organisation ?? '' }
  } else if (sourcePost) {
    initialValues = {
      title: sourcePost.title,
      type: sourcePost.type,
      organisation: sourcePost.organisation,
      location: sourcePost.location,
      deadline: sourcePost.deadline,
      stipend: sourcePost.stipend,
      description: sourcePost.description,
    }
  }

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">Post opportunity</h1>
      <p className="mt-1 text-sm text-muted">An admin checks every post before students can see it.</p>

      {sourcePost && (
        <p className="mt-4 flex items-start gap-2 rounded-card border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-ink">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <span>
            Editing a copy of a rejected post. Fix what the admin asked for, then submit it as a new post.
          </span>
        </p>
      )}

      <div className="mt-5">
        {/* key: switching between a copy and a new post starts the form fresh. */}
        <PostOpportunityForm
          key={sourcePost?.id ?? 'new'}
          defaultOrganisation={alumnus?.organisation ?? ''}
          initialValues={initialValues}
          onSubmit={submitPost}
        />
      </div>
    </section>
  )
}
