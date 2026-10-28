import StatCard from '../../components/admin/StatCard'
import TypeBarChart from '../../components/admin/TypeBarChart'
import WaitingForReview from '../../components/admin/WaitingForReview'
import { useApp } from '../../store/AppContext'
import { getPendingPosts, getUserName } from '../../store/reducer'
import { formatLongDate } from '../../utils/dates'
import { isLiveOpportunity } from '../../utils/filters'

export default function Overview() {
  const { state } = useApp()

  const activeUserCount = state.users.filter((user) => user.isActive).length
  const approvedOpportunities = state.opportunities.filter((opportunity) => opportunity.status === 'approved')
  const liveCount = approvedOpportunities.filter(isLiveOpportunity).length
  const pendingPosts = getPendingPosts(state)

  const oldestPending = pendingPosts.slice(0, 3).map((post) => ({
    post,
    posterName: getUserName(state, post.postedBy),
  }))

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-muted">{formatLongDate(new Date())}</p>

      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li>
          <StatCard label="Users" value={state.users.length} hint={`${activeUserCount} active`} />
        </li>
        <li>
          <StatCard label="Live opportunities" value={liveCount} hint="Approved and open" />
        </li>
        <li>
          <StatCard label="Pending review" value={pendingPosts.length} hint="Open the queue" to="/admin/pending" />
        </li>
        <li>
          <StatCard label="Applications" value={state.applications.length} hint="From all students" />
        </li>
      </ul>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <TypeBarChart opportunities={approvedOpportunities} />
        <WaitingForReview posts={oldestPending} />
      </div>
    </section>
  )
}
