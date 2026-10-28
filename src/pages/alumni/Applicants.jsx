import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import ApplicantPostGroup from '../../components/opportunity/ApplicantPostGroup'
import ApplicantsEmptyState from '../../components/opportunity/ApplicantsEmptyState'
import ApplicantsToolbar from '../../components/opportunity/ApplicantsToolbar'
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

  function changePostFilter(postId) {
    setSearchParams(postId === 'all' ? {} : { post: postId }, { replace: true })
  }

  // Approved posts, plus the linked post if it isn't approved, so the menu always shows the current choice.
  const filterPosts = alumniPosts.filter((post) => post.status === 'approved' || post.id === postFilter)

  const [statusFilter, setStatusFilter] = useState('Submitted')

  // Applicants for the chosen post, newest first.
  const applicants = getAlumniApplications(state)
    .filter((application) => postFilter === 'all' || application.opportunityId === postFilter)
    .map((application) => ({
      application,
      student: state.users.find((user) => user.id === application.studentId),
      opportunity: state.opportunities.find((opportunity) => opportunity.id === application.opportunityId),
    }))
    .filter(({ student, opportunity }) => student && opportunity)
    .sort((a, b) => b.application.appliedAt.localeCompare(a.application.appliedAt))

  function countFor(status) {
    if (status === 'All') return applicants.length
    return applicants.filter(({ application }) => application.status === status).length
  }

  const visibleApplicants =
    statusFilter === 'All' ? applicants : applicants.filter(({ application }) => application.status === statusFilter)

  // One group per post, latest deadline first. Posts with nobody under the current tab are left out.
  const groups = alumniPosts
    .map((post) => {
      const postApplicants = applicants.filter(({ application }) => application.opportunityId === post.id)
      return {
        post,
        entries: visibleApplicants.filter(({ application }) => application.opportunityId === post.id),
        totalCount: postApplicants.length,
        toReviewCount: postApplicants.filter(({ application }) => application.status === 'Submitted').length,
      }
    })
    .filter((group) => group.entries.length > 0)
    .sort((a, b) => b.post.deadline.localeCompare(a.post.deadline))

  // A decision moves the row out of every tab except All, so focus goes to the next row
  // (or the list) instead of being lost with the removed buttons.
  const [focusRequest, setFocusRequest] = useState(null)
  const groupsRef = useRef(null)

  useEffect(() => {
    if (!focusRequest) return
    const row = focusRequest.id && document.getElementById(`applicant-row-${focusRequest.id}`)
    ;(row || groupsRef.current)?.focus()
  }, [focusRequest])

  function moveFocusAfter(application) {
    if (statusFilter === 'All') {
      setFocusRequest({ id: application.id })
      return
    }
    const orderedEntries = groups.flatMap((group) => group.entries)
    const index = orderedEntries.findIndex((entry) => entry.application === application)
    const neighbour = orderedEntries[index + 1] ?? orderedEntries[index - 1]
    setFocusRequest({ id: neighbour?.application.id ?? null })
  }

  function setStatus(application, status) {
    dispatch({ type: 'SET_APPLICATION_STATUS', id: application.id, status })
  }

  function decide(application, student, status) {
    setStatus(application, status)
    showToast({
      message: `${status} ${student.name}`,
      actionLabel: 'Undo',
      onAction: () => setStatus(application, 'Submitted'),
    })
    moveFocusAfter(application)
  }

  // The Undo button on a decided row; the toast's Undo puts the decision back.
  function undoDecision(application, student) {
    const previousStatus = application.status
    setStatus(application, 'Submitted')
    showToast({
      message: `Moved ${student.name} back to To review`,
      actionLabel: 'Undo',
      onAction: () => setStatus(application, previousStatus),
    })
    moveFocusAfter(application)
  }

  return (
    <section>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">
        Applicants <span className="font-normal text-muted tabular-nums">({applicants.length})</span>
      </h1>

      <div className="mt-4">
        <ApplicantsToolbar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          countFor={countFor}
          postFilter={postFilter}
          posts={filterPosts}
          onPostChange={changePostFilter}
        />
      </div>

      <div className="mt-5">
        {groups.length === 0 ? (
          <ApplicantsEmptyState
            hasApplicants={applicants.length > 0}
            postFilter={postFilter}
            statusFilter={statusFilter}
            onShowAllPosts={() => changePostFilter('all')}
            onShowAllStatuses={() => setStatusFilter('All')}
          />
        ) : (
          <div ref={groupsRef} tabIndex={-1} className="space-y-10 focus-visible:outline-none">
            {groups.map((group) => (
              <ApplicantPostGroup
                key={group.post.id}
                post={group.post}
                entries={group.entries}
                totalCount={group.totalCount}
                toReviewCount={group.toReviewCount}
                onDecide={decide}
                onUndo={undoDecision}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
