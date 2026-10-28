import { List, ListFilter, Plus } from 'lucide-react'
import { useSearchParams } from 'react-router'
import PostRow from '../../components/opportunity/PostRow'
import Button from '../../components/ui/Button'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import StatusFilterChips from '../../components/ui/StatusFilterChips'
import { useApp } from '../../store/AppContext'
import { getAlumniPosts } from '../../store/reducer'
import { useToast } from '../../store/ToastContext'

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

export default function MyPosts() {
  const { state, dispatch } = useApp()
  const { showToast } = useToast()

  // The filter lives in the URL, like on My applications, so going back keeps it.
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFilter = searchParams.get('status') ?? 'all'

  function changeFilter(status) {
    setSearchParams(status === 'all' ? {} : { status }, { replace: true })
  }

  // Newest first.
  const posts = getAlumniPosts(state).sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  const visiblePosts = statusFilter === 'all' ? posts : posts.filter((post) => post.status === statusFilter)

  function countFor(status) {
    if (status === 'all') return posts.length
    return posts.filter((post) => post.status === status).length
  }

  function countApplicants(postId) {
    return state.applications.filter((application) => application.opportunityId === postId).length
  }

  function withdrawPost(post) {
    dispatch({ type: 'WITHDRAW_OPPORTUNITY', id: post.id })
    showToast({
      message: 'Post withdrawn',
      actionLabel: 'Undo',
      onAction: () => dispatch({ type: 'RESTORE_OPPORTUNITY', opportunity: post }),
    })
  }

  const activeFilterLabel = STATUS_FILTERS.find((filter) => filter.value === statusFilter)?.label ?? ''

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl leading-tight font-semibold tracking-tight">
          My posts <span className="font-normal text-muted tabular-nums">({posts.length})</span>
        </h1>
        <ButtonLink to="/alumni/post">
          <Plus size={16} aria-hidden="true" />
          Post opportunity
        </ButtonLink>
      </div>

      {posts.length === 0 ? (
        <div className="mt-5">
          <EmptyState icon={List} message="You haven't posted anything yet">
            <ButtonLink to="/alumni/post">Post opportunity</ButtonLink>
          </EmptyState>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <StatusFilterChips
              label="Filter by status"
              options={STATUS_FILTERS.map((filter) => ({ ...filter, count: countFor(filter.value) }))}
              selected={statusFilter}
              onSelect={changeFilter}
            />
          </div>

          <div className="mt-4">
            {visiblePosts.length === 0 ? (
              <EmptyState icon={ListFilter} message={`No ${activeFilterLabel.toLowerCase()} posts`}>
                <Button variant="secondary" onClick={() => changeFilter('all')}>
                  Show all
                </Button>
              </EmptyState>
            ) : (
              <ul className="space-y-2 sm:space-y-0 sm:divide-y sm:divide-line sm:overflow-hidden sm:rounded-card sm:border sm:border-line sm:bg-surface">
                {visiblePosts.map((post) => (
                  <li key={post.id}>
                    <PostRow post={post} applicantCount={countApplicants(post.id)} onWithdraw={withdrawPost} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  )
}
