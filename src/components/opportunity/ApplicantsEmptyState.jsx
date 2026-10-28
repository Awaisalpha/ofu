import { Inbox, ListFilter } from 'lucide-react'
import Button from '../ui/Button'
import ButtonLink from '../ui/ButtonLink'
import EmptyState from '../ui/EmptyState'

const TAB_MESSAGES = {
  Submitted: 'Nothing to review. Every applicant has a decision.',
  Accepted: 'No accepted applicants yet',
  Rejected: 'No rejected applicants',
}

// Three cases: no applicants at all, none for the chosen post, none under the chosen tab.
export default function ApplicantsEmptyState({ hasApplicants, postFilter, statusFilter, onShowAllPosts, onShowAllStatuses }) {
  if (!hasApplicants && postFilter === 'all') {
    return (
      <EmptyState icon={Inbox} message="No applicants yet. They appear here once your approved posts get applications.">
        <ButtonLink to="/alumni/posts">See my posts</ButtonLink>
      </EmptyState>
    )
  }

  if (!hasApplicants) {
    return (
      <EmptyState icon={Inbox} message="No applicants for this post yet">
        <Button variant="secondary" onClick={onShowAllPosts}>
          Show all posts
        </Button>
      </EmptyState>
    )
  }

  return (
    <EmptyState icon={ListFilter} message={TAB_MESSAGES[statusFilter]}>
      <Button variant="secondary" onClick={onShowAllStatuses}>
        Show all applicants
      </Button>
    </EmptyState>
  )
}
