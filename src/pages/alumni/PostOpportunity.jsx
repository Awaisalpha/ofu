import { useNavigate } from 'react-router'
import PostOpportunityForm from '../../components/opportunity/PostOpportunityForm'
import { CURRENT_ALUMNI_ID } from '../../data/users'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../store/ToastContext'
import { dateFromToday } from '../../utils/dates'

export default function PostOpportunity() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const alumnus = state.users.find((user) => user.id === CURRENT_ALUMNI_ID)

  // New posts wait for an admin before students can see them.
  function submitPost(post) {
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
    showToast({
      message: 'Sent for review',
      actionLabel: 'View',
      onAction: () => navigate('/alumni/posts'),
    })
  }

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">Post opportunity</h1>
      <p className="mt-1 text-sm text-muted">An admin checks every post before students can see it.</p>

      <div className="mt-5">
        <PostOpportunityForm defaultOrganisation={alumnus?.organisation ?? ''} onSubmit={submitPost} />
      </div>
    </section>
  )
}
