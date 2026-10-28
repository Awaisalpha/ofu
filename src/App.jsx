import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import OverviewSkeleton from './components/admin/OverviewSkeleton'
import AppShell from './components/layout/AppShell'
import AlumniPostDetail from './pages/alumni/AlumniPostDetail'
import Applicants from './pages/alumni/Applicants'
import MyPosts from './pages/alumni/MyPosts'
import PostOpportunity from './pages/alumni/PostOpportunity'
import PendingApprovals from './pages/admin/PendingApprovals'
import Users from './pages/admin/Users'
import Landing from './pages/public/Landing'
import Browse from './pages/student/Browse'
import MyApplications from './pages/student/MyApplications'
import OpportunityDetail from './pages/student/OpportunityDetail'
import Saved from './pages/student/Saved'

// Loaded only when an admin opens it, so the chart library never downloads
// on the landing or student pages.
const Overview = lazy(() => import('./pages/admin/Overview'))
// The role comes from the URL, so a refresh keeps it and the nav always matches the page.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/student" element={<AppShell role="student" />}>
        <Route index element={<Navigate to="browse" replace />} />
        <Route path="browse" element={<Browse />} />
        <Route path="opportunities/:id" element={<OpportunityDetail />} />
        <Route path="saved" element={<Saved />} />
        <Route path="applications" element={<MyApplications />} />
      </Route>

      <Route path="/alumni" element={<AppShell role="alumni" />}>
        <Route index element={<Navigate to="post" replace />} />
        <Route path="post" element={<PostOpportunity />} />
        <Route path="posts" element={<MyPosts />} />
        <Route path="posts/:id" element={<AlumniPostDetail />} />
        <Route path="applicants" element={<Applicants />} />
      </Route>

      <Route path="/admin" element={<AppShell role="admin" />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route
          path="overview"
          element={
            <Suspense fallback={<OverviewSkeleton />}>
              <Overview />
            </Suspense>
          }
        />
        <Route path="pending" element={<PendingApprovals />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
