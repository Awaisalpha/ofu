import { Navigate, Route, Routes } from 'react-router'
import AppShell from './components/layout/AppShell'
import Applicants from './pages/alumni/Applicants'
import MyPosts from './pages/alumni/MyPosts'
import PostOpportunity from './pages/alumni/PostOpportunity'
import Overview from './pages/admin/Overview'
import PendingApprovals from './pages/admin/PendingApprovals'
import Users from './pages/admin/Users'
import Landing from './pages/public/Landing'
import Browse from './pages/student/Browse'
import MyApplications from './pages/student/MyApplications'
import OpportunityDetail from './pages/student/OpportunityDetail'
import Saved from './pages/student/Saved'

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
        <Route path="applicants" element={<Applicants />} />
      </Route>

      <Route path="/admin" element={<AppShell role="admin" />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="pending" element={<PendingApprovals />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
