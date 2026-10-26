import { SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router'
import FilterBar from '../../components/opportunity/FilterBar'
import OpportunityCard from '../../components/opportunity/OpportunityCard'
import OpportunityCardSkeleton from '../../components/opportunity/OpportunityCardSkeleton'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import Skeleton from '../../components/ui/Skeleton'
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading'
import { useApp } from '../../store/AppContext'
import { filterOpportunities, sortOpportunities } from '../../utils/filters'

const SKELETON_CARD_COUNT = 6

export default function Browse() {
  const { state } = useApp()
  const isLoading = useSimulatedLoading()

  // Filters live in the URL, so they are still there after opening a card and going back.
  const [searchParams, setSearchParams] = useSearchParams()
  const searchText = searchParams.get('q') ?? ''
  const type = searchParams.get('type') ?? 'All'
  const sortBy = searchParams.get('sort') ?? 'closing-soonest'
  const hasActiveFilters = searchText !== '' || type !== 'All'

  function updateParam(key, value, defaultValue) {
    const newParams = new URLSearchParams(searchParams)
    if (value === defaultValue) {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    // replace: typing in the search box shouldn't add a history entry per letter.
    setSearchParams(newParams, { replace: true })
  }

  // Keeps the chosen sort order; it isn't a filter.
  function clearFilters() {
    const newParams = new URLSearchParams()
    if (searchParams.has('sort')) newParams.set('sort', sortBy)
    setSearchParams(newParams, { replace: true })
  }

  const approvedOpportunities = state.opportunities.filter((opportunity) => opportunity.status === 'approved')
  const filteredOpportunities = sortOpportunities(
    filterOpportunities(approvedOpportunities, { searchText, type }),
    sortBy,
  )
  const resultCount = filteredOpportunities.length

  return (
    <section>
      <h1 className="text-2xl font-bold">Browse opportunities</h1>
      <p className="mt-1 text-stone-600">Verified jobs, internships, scholarships, freelance work and events.</p>

      <div className="mt-6">
        <FilterBar
          searchText={searchText}
          type={type}
          sortBy={sortBy}
          onSearchChange={(value) => updateParam('q', value, '')}
          onTypeChange={(value) => updateParam('type', value, 'All')}
          onSortChange={(value) => updateParam('sort', value, 'closing-soonest')}
        />
      </div>

      <div className="mt-6 flex h-9 items-center justify-between gap-4">
        {isLoading ? (
          <Skeleton className="h-5 w-44" />
        ) : (
          <p aria-live="polite" className="text-sm text-stone-600">
            Showing {resultCount} {resultCount === 1 ? 'opportunity' : 'opportunities'}
          </p>
        )}
        {hasActiveFilters && (
          <Button variant="secondary" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
              <OpportunityCardSkeleton key={index} />
            ))}
          </div>
        ) : resultCount === 0 ? (
          <EmptyState icon={SearchX} message="No opportunities match your search.">
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </EmptyState>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <li key={opportunity.id}>
                <OpportunityCard opportunity={opportunity} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
