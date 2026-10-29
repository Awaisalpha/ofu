// The three tabs of the landing page tour, in order. role matches the app's role names.
// previewDescription is read to screen readers instead of the decorative page preview.
export const tourRoles = [
  {
    role: 'student',
    name: 'Students',
    description: 'Browse verified opportunities, filter by type and save the ones that matter.',
    previewDescription: 'Preview of the student Browse page: a search box, type filters and opportunity cards with deadlines.',
  },
  {
    role: 'alumni',
    name: 'Alumni',
    description: 'Post an opportunity with a live preview of how students will see it.',
    previewDescription: 'Preview of the alumni Post opportunity page: a filled-in form beside the card students will see.',
  },
  {
    role: 'admin',
    name: 'Admin',
    description: 'Review every post and see activity across the platform at a glance.',
    previewDescription: 'Preview of the admin Overview page: four stat cards, an activity chart, opportunities by type and posts waiting for review.',
  },
]
