import { lazy, Suspense } from 'react'
import PostOpportunity from '../../pages/alumni/PostOpportunity'
import Browse from '../../pages/student/Browse'
import OverviewSkeleton from '../admin/OverviewSkeleton'

// The same module App.jsx loads lazily, so the chart library only downloads
// the first time someone picks Admin in the tour.
const Overview = lazy(() => import('../../pages/admin/Overview'))

// The real page for each role, in preview mode.
export default function TourRolePage({ role }) {
  if (role === 'alumni') return <PostOpportunity preview />
  if (role === 'admin') {
    return (
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview preview />
      </Suspense>
    )
  }
  return <Browse preview />
}
