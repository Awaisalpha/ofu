import {
  BarChart3,
  Bookmark,
  ClipboardCheck,
  FileText,
  Inbox,
  List,
  PlusCircle,
  Search,
  Users,
} from 'lucide-react'

export const roleLabels = {
  student: 'Student',
  alumni: 'Alumni',
  admin: 'Admin',
}

export const roleHomePaths = {
  student: '/student/browse',
  alumni: '/alumni/post',
  admin: '/admin/overview',
}

export const navItemsByRole = {
  student: [
    { label: 'Browse', to: '/student/browse', icon: Search },
    { label: 'Saved', to: '/student/saved', icon: Bookmark, countKey: 'saved' },
    { label: 'Applications', to: '/student/applications', icon: FileText, countKey: 'applications' },
  ],
  alumni: [
    { label: 'Post', to: '/alumni/post', icon: PlusCircle },
    { label: 'My posts', to: '/alumni/posts', icon: List },
    { label: 'Applicants', to: '/alumni/applicants', icon: Inbox },
  ],
  admin: [
    { label: 'Overview', to: '/admin/overview', icon: BarChart3 },
    { label: 'Pending', to: '/admin/pending', icon: ClipboardCheck },
    { label: 'Users', to: '/admin/users', icon: Users },
  ],
}
