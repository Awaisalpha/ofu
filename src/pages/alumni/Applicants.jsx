import { Inbox } from 'lucide-react'
import { useSearchParams } from 'react-router'
import ApplicantCard from '../../components/opportunity/ApplicantCard'
import Button from '../../components/ui/Button'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import { useApp } from '../../store/AppContext'
import { getAlumniApplications, getAlumniPosts } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'

export default function Applicants() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()

  // The chosen post lives in the URL (?post=ID), so My posts can link straight to it
  // and going back keeps it.
  const [searchParams, setSearchParams] = useSearchParams()
  const alumniPosts = getAlumniPosts(state)
  const requestedPost = searchParams.get('post')
  // An id that isn't one of this alumnus's posts falls back to All posts.
  const postFilter = alumniPosts.some((post) => post.id === requestedPost) ? requestedPost : 'all'

  function changeFilter(postId) {
    setSearchParams(postId === 'all' ? {} : { post: postId }, { replace: true })
  }

  // Approved posts, plus the linked post if it isn't approved, so the menu always shows the current choice.
  const filterPosts = alumniPosts.filter((post) => post.status === 'approved' || post.id === postFilter)

  // Newest first. Not grouped by status, so a card stays in place after Accept or Reject.
  const applicants = getAlumniApplications(state)
    .filter((application) => postFilter === 'all' || application.opportunityId === postFilter)
    .map((application) => ({
      application,
      student: state.users.find((user) => user.id === application.studentId),
      opportunity: state.opportunities.find((opportunity) => opportunity.id === application.opportunityId),
    }))
    .filter(({ student }) => student)
    .sort((a, b) => b.application.appliedAt.localeCompare(a.application.appliedAt))

  function decide(application, student, status) {
    dispatch({ type: 'SET_APPLICATION_STATUS', id: application.id, status })
    showToast({
      message: `${status} ${student.name}`,
      actionLabel: 'Undo',
      onAction: () => dispatch({ type: 'SET_APPLICATION_STATUS', id: application.id, status: 'Submitted' }),
    })
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl leading-tight font-semibold tracking-tight">
          Applicants <span className="font-normal text-muted tabular-nums">({applicants.length})</span>
        </h1>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <label htmlFor="post-filter" className="text-sm whitespace-nowrap text-muted">
            Filter by post
          </label>
          <select
            id="post-filter"
            value={postFilter}
            onChange={(event) => changeFilter(event.target.value)}
            className="h-9 min-w-0 flex-1 rounded-card border border-line-strong bg-surface px-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:max-w-72 sm:text-sm"
          >
            <option value="all">All posts</option>
            {filterPosts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        {applicants.length === 0 ? (
          postFilter === 'all' ? (
            <EmptyState icon={Inbox} message="No applicants yet. They appear here once your approved posts get applications.">
              <ButtonLink to="/alumni/posts">See my posts</ButtonLink>
            </EmptyState>
          ) : (
            <EmptyState icon={Inbox} message="No applicants for this post yet">
              <Button variant="secondary" onClick={() => changeFilter('all')}>
                Show all posts
              </Button>
            </EmptyState>
          )
        ) : (
          <ul className="grid gap-3 xl:grid-cols-2">
            {applicants.map(({ application, student, opportunity }) => (
              <li key={application.id}>
                <ApplicantCard
                  application={application}
                  student={student}
                  opportunity={opportunity}
                  onDecide={decide}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
