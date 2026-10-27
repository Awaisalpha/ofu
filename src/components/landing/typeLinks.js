import { Briefcase, CalendarDays, GraduationCap, Laptop, PenTool } from 'lucide-react'

// One entry per opportunity type for the landing page tiles and chips.
// "to" opens student Browse already filtered by that type.
export const typeLinks = [
  { type: 'Job', label: 'Jobs', icon: Briefcase, to: '/student/browse?type=job' },
  { type: 'Internship', label: 'Internships', icon: Laptop, to: '/student/browse?type=internship' },
  { type: 'Scholarship', label: 'Scholarships', icon: GraduationCap, to: '/student/browse?type=scholarship' },
  { type: 'Freelance', label: 'Freelance', icon: PenTool, to: '/student/browse?type=freelance' },
  { type: 'Event', label: 'Events', icon: CalendarDays, to: '/student/browse?type=event' },
]
